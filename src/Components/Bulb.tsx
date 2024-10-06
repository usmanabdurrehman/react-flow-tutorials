import { useEffect, useState } from "react";
import { Bulb as BulbIcon } from "../icons";
import { useDarkMode } from "../store";
import Terminal from "./Terminal";
import {
  Node,
  NodeProps,
  Position,
  ReactFlowState,
  getOutgoers,
  useNodesData,
  useReactFlow,
  useStore,
} from "@xyflow/react";
import { Box, Text } from "@chakra-ui/react";
import { ElectricalComponentData, ElectricalComponentType } from "../types";
import { getUnit } from "../utils";

type BulbNode = Node<ElectricalComponentData, "string">;

const storeSelector = (state: ReactFlowState) => ({
  nodesLength: state.nodes.length || 0,
  edgesLength: state.edges.length || 0,
});

export default function Bulb({
  data: { value },
  type,
  id,
}: NodeProps<BulbNode>) {
  const { isDark } = useDarkMode();
  let color = "black";
  if (isDark) color = "white";

  const [nodeIds, setNodeIds] = useState<string[]>([]);
  const componentsData = useNodesData(nodeIds);

  const [isOn, setIsOn] = useState(false);

  const { nodesLength, edgesLength } = useStore(storeSelector);

  const unit = getUnit(type as ElectricalComponentType);

  const { getNodes, getEdges } = useReactFlow();

  const isCircuitComplete = (nodeId: string, targetId: string): boolean => {
    const nodes = getNodes();
    const edges = getEdges();
    const node = nodes.find((node) => node.id === nodeId);
    if (!node) return false;
    const outgoer = getOutgoers(node, nodes, edges)?.[0];

    if (outgoer?.id === targetId) return true;

    return isCircuitComplete(outgoer?.id, targetId);
  };

  const isBatteryPresent = (nodeId: string, targetId: string): boolean => {
    const nodes = getNodes();
    const edges = getEdges();
    const node = nodes.find((node) => node.id === nodeId);
    if (!node) return false;
    const outgoer = getOutgoers(node, nodes, edges)?.[0];

    if (outgoer?.id === targetId) return false;

    if (outgoer?.type === ElectricalComponentType.Battery) return true;

    return isBatteryPresent(outgoer?.id, targetId);
  };

  const getCircuitResistors = (
    nodeId: string,
    targetId: string,
    components: Node[] = []
  ): Node[] => {
    const nodes = getNodes();
    const edges = getEdges();
    const node = nodes.find((node) => node.id === nodeId);
    if (!node) return components;
    const outgoer = getOutgoers(node, nodes, edges)?.[0];
    if (outgoer?.data?.type === ElectricalComponentType.Resistor)
      components.push(outgoer);

    if (outgoer?.id === targetId) return components;

    return getCircuitResistors(outgoer?.id, targetId, components);
  };

  useEffect(() => {
    const resistors = getCircuitResistors(id, id);
    setNodeIds(resistors.map((resistor) => resistor.id));
  }, [nodesLength, edgesLength]);

  useEffect(() => {
    const turnOn = isCircuitComplete(id, id);
    const isBatteryPresentInCircuit = isBatteryPresent(id, id);
    const totalResistance = componentsData.reduce((acc, resistor) => {
      return acc + (resistor?.data?.value as number);
    }, 0);
    console.log({ totalResistance, componentsData });
    setIsOn(turnOn && isBatteryPresentInCircuit && totalResistance < 12);
  }, [edgesLength, nodesLength, componentsData]);

  console.log({ nodeIds });

  return (
    <Box height="64px" onClick={() => setIsOn(!isOn)}>
      <BulbIcon color={color} isOn={isOn} height={64} />
      <Text fontSize="xx-small" pos="absolute" color={color}>
        {value} {unit}
      </Text>
      <Terminal
        style={{ top: 50, left: 22 }}
        type="source"
        position={Position.Left}
        id="right"
      />
      <Terminal
        style={{ top: 50, right: 22 }}
        type="target"
        position={Position.Right}
        id="left"
      />
    </Box>
  );
}
