import ReactFlow, {
  addEdge,
  Background,
  Connection,
  Controls,
  Edge,
  MiniMap,
  Node,
  NodeDragHandler,
  NodeProps,
  Panel,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";
import { Box, Flex, IconButton } from "@chakra-ui/react";
import { useCallback, useRef } from "react";
import Wire from "../Components/Wire";
import { v4 as uuid } from "uuid";
import { initialEdges, initialNodes } from "./Workflow.constants";
import ElectricalComponent from "../Components/ElectricalComponent";
import { Capacitor, Resistor } from "../icons";
import { ElectricalComponentState, ElectricalComponentType } from "../types";

const nodeTypes = {
  electricalComponent: ElectricalComponent,
};

const edgeTypes = {
  wire: Wire,
};

export const Workflow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const { getIntersectingNodes } = useReactFlow();

  // this ref stores the current dragged node
  const dragRef = useRef<Node | null>(null);
  const overlappedRef = useRef<Node | null>(null);

  const onNodeDragStart: NodeDragHandler = (evt, node) => {
    dragRef.current = node;
  };

  const onNodeDrag: NodeDragHandler = (evt, node) => {
    const intersectingNodes = getIntersectingNodes(node);
    setNodes((prevNodes) =>
      prevNodes.map((node) =>
        node.id === dragRef?.current?.id
          ? {
              ...node,
              data: {
                ...node?.data,
                state: intersectingNodes?.[0]
                  ? ElectricalComponentState.Add
                  : undefined,
              },
            }
          : node
      )
    );
    overlappedRef.current = intersectingNodes ? intersectingNodes[0] : null;
  };

  const onNodeDragStop: NodeDragHandler = (evt, node) => {
    dragRef.current = null;
  };

  const onConnect = useCallback(
    (connection: Connection) => {
      const edge = {
        ...connection,
        id: uuid(),
        type: "wire",
      };
      setEdges((prevEdges) => addEdge(edge, prevEdges));
    },
    [edges]
  );

  const addNode = (node: Node) => {
    setNodes((prevNodes) => [...prevNodes, node]);
  };

  return (
    <Box height={"100vh"} width="100vw" border="1px solid black">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodeDragStart={onNodeDragStart}
        onNodeDrag={onNodeDrag}
        onNodeDragStop={onNodeDragStop}
      >
        <Panel position="top-right">
          <Flex direction="column" gap={1}>
            <IconButton
              icon={<Resistor />}
              aria-label="Resistor"
              size="sm"
              onClick={() =>
                addNode({
                  id: uuid(),
                  data: { type: ElectricalComponentType.Resistor },
                  position: { x: 300, y: 300 },
                  type: "electricalComponent",
                })
              }
            />
            <IconButton
              icon={<Capacitor height={16} />}
              aria-label="Capacitor"
              size="sm"
              onClick={() =>
                addNode({
                  id: uuid(),
                  data: { type: ElectricalComponentType.Capacitor },
                  position: { x: 300, y: 300 },
                  type: "electricalComponent",
                })
              }
            />
          </Flex>
        </Panel>
        <Background />
        <Controls />
      </ReactFlow>
    </Box>
  );
};
