import { Box, Text } from "@chakra-ui/react";
import { Lock, Plus, Unlock, X } from "react-bootstrap-icons";
import { Node, NodeProps, Position, useReactFlow } from "@xyflow/react";
import { Capacitor, Inductor, Resistor } from "../icons";
import {
  ElectricalComponentData,
  ElectricalComponentState,
  ElectricalComponentType,
} from "../types";
import Terminal from "./Terminal";
import { useDarkMode } from "../store";
import Rotator from "./Rotator";
import { getUnit } from "../utils";

type ElectricalComponentNode = Node<ElectricalComponentData, "string">;

export default function ElectricalComponent({
  data: {
    type,
    state,
    value,
    visible = true,
    connectable,
    rotation,
    isAttachedToGroup,
  },
  id,
  selected,
  parentId,
  ...rest
}: NodeProps<ElectricalComponentNode>) {
  const { isDark } = useDarkMode();
  const isAdditionValid = state === ElectricalComponentState.Add;
  const isAdditionInvalid = state === ElectricalComponentState.NotAdd;

  const { updateNode } = useReactFlow();

  let color = "black";
  if (isDark) color = "white";

  const unit = getUnit(type as ElectricalComponentType);

  return (
    <Box
      pos="relative"
      style={{
        transform: `rotate(${rotation}deg)`,
        visibility: visible ? "visible" : "hidden",
        ...(isAdditionValid && {
          background: "#58ed58",
        }),
        ...(isAdditionInvalid && {
          background: "#ff5050",
        }),
      }}
    >
      <Rotator id={id} selected={selected} />
      {type === ElectricalComponentType.Capacitor && (
        <Capacitor color={color} height={24} />
      )}
      {type === ElectricalComponentType.Resistor && (
        <Resistor color={color} height={24} />
      )}
      {type === ElectricalComponentType.Inductor && (
        <Inductor color={color} height={24} />
      )}
      {parentId && selected && (
        <div
          style={{
            position: "absolute",
            top: -23,
            right: 20,
            color,
          }}
          onClick={() => {
            updateNode(id, (node) => ({
              extent: node.extent === "parent" ? undefined : "parent",
              data: { ...node.data, isAttachedToGroup: !isAttachedToGroup },
            }));
          }}
        >
          {isAttachedToGroup ? <Lock /> : <Unlock />}
        </div>
      )}
      {isAdditionValid && (
        <Plus style={{ position: "absolute", top: -17, right: 2, color }} />
      )}
      {isAdditionInvalid && (
        <X style={{ position: "absolute", top: -17, right: 2, color }} />
      )}
      <Text
        fontSize="xx-small"
        style={{
          position: "absolute",
          color,
        }}
      >
        {value} {unit}
      </Text>
      <Terminal
        type="source"
        position={Position.Right}
        id="right"
        isConnectable={connectable}
      />
      <Terminal
        type="source"
        position={Position.Left}
        id="left"
        isConnectable={connectable}
      />
    </Box>
  );
}
