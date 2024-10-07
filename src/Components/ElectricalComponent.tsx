import { Handle, Node, NodeProps, Position, useReactFlow } from "@xyflow/react";
import React from "react";
import {
  ElectricalComponentData,
  ElectricalComponentState,
  ElectricalComponentType,
} from "../types";
import { Box, Text } from "@chakra-ui/react";
import { Capacitor, Inductor, Resistor } from "../icons";
import { getUnit } from "../utils";
import Terminal from "./Terminal";
import Rotation from "./Rotation";
import { Lock, Plus, Unlock, X } from "react-bootstrap-icons";
import { useDarkMode } from "../store";

type ElectricalComponentNode = Node<ElectricalComponentData, "string">;

export default function ElectricalComponent({
  data: {
    value,
    type,
    rotation,
    state,
    isAttachedToGroup,
    visible = true,
    connectable,
  },
  selected,
  id,
  parentId,
}: NodeProps<ElectricalComponentNode>) {
  const unit = getUnit(type as ElectricalComponentType);

  const isAdditionValid = state === ElectricalComponentState.Add;
  const isAdditionInvalid = state === ElectricalComponentState.NotAdd;

  const { updateNode } = useReactFlow();

  const { isDark } = useDarkMode();

  let color = "black";
  if (isDark) color = "white";

  return (
    <Box
      pos={"relative"}
      style={{
        transform: `rotate(${rotation}deg)`,
        ...(isAdditionValid && { background: "#58ed58" }),
        ...(isAdditionInvalid && { background: "#ff0505" }),
        visibility: visible ? "visible" : "hidden",
      }}
    >
      <Rotation selected={selected} id={id} />
      {parentId && selected && (
        <div
          style={{
            position: "absolute",
            top: -23,
            right: 20,
            color,
          }}
          onClick={() => {
            updateNode(id, (prevNode) => ({
              extent: prevNode.extent === "parent" ? undefined : "parent",
              data: { ...prevNode.data, isAttachedToGroup: !isAttachedToGroup },
            }));
          }}
        >
          {isAttachedToGroup ? <Lock /> : <Unlock />}
        </div>
      )}
      {type === ElectricalComponentType.Resistor && (
        <Resistor height={24} color={color} />
      )}
      {type === ElectricalComponentType.Capacitor && (
        <Capacitor height={24} color={color} />
      )}
      {type === ElectricalComponentType.Inductor && (
        <Inductor height={24} color={color} />
      )}
      <Text fontSize="xx-small" position={"absolute"} color={color}>
        {value} {unit}
      </Text>
      {isAdditionValid && (
        <Plus
          style={{ position: "absolute", top: -17, right: 2 }}
          color={color}
        />
      )}
      {isAdditionInvalid && (
        <X style={{ position: "absolute", top: -17, right: 2 }} color={color} />
      )}
      <Terminal
        type="target"
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
