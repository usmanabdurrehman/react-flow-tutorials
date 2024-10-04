import { Handle, Node, NodeProps, Position } from "@xyflow/react";
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
import { Plus, X } from "react-bootstrap-icons";

type ElectricalComponentNode = Node<ElectricalComponentData, "string">;

export default function ElectricalComponent({
  data: { value, type, rotation, state },
  selected,
  id,
}: NodeProps<ElectricalComponentNode>) {
  const unit = getUnit(type as ElectricalComponentType);

  const isAdditionValid = state === ElectricalComponentState.Add;
  const isAdditionInvalid = state === ElectricalComponentState.NotAdd;

  return (
    <Box
      pos={"relative"}
      style={{
        transform: `rotate(${rotation}deg)`,
        ...(isAdditionValid && { background: "#58ed58" }),
        ...(isAdditionInvalid && { background: "#ff0505" }),
      }}
    >
      <Rotation selected={selected} id={id} />
      {type === ElectricalComponentType.Resistor && <Resistor height={24} />}
      {type === ElectricalComponentType.Capacitor && <Capacitor height={24} />}
      {type === ElectricalComponentType.Inductor && <Inductor height={24} />}
      <Text fontSize="xx-small" position={"absolute"}>
        {value} {unit}
      </Text>
      {isAdditionValid && (
        <Plus style={{ position: "absolute", top: -17, right: 2 }} />
      )}
      {isAdditionInvalid && (
        <X style={{ position: "absolute", top: -17, right: 2 }} />
      )}
      <Terminal type="source" position={Position.Right} id="right" />
      <Terminal type="source" position={Position.Left} id="left" />
    </Box>
  );
}
