import { Handle, Node, NodeProps, Position } from "@xyflow/react";
import React from "react";
import { ElectricalComponentData, ElectricalComponentType } from "../types";
import { Box, Text } from "@chakra-ui/react";
import { Capacitor, Inductor, Resistor } from "../icons";
import { getUnit } from "../utils";
import Terminal from "./Terminal";
import Rotation from "./Rotation";

type ElectricalComponentNode = Node<ElectricalComponentData, "string">;

export default function ElectricalComponent({
  data: { value, type, rotation },
  selected,
  id,
}: NodeProps<ElectricalComponentNode>) {
  const unit = getUnit(type as ElectricalComponentType);

  return (
    <Box pos={"relative"} style={{ transform: `rotate(${rotation}deg)` }}>
      <Rotation selected={selected} id={id} />
      {type === ElectricalComponentType.Resistor && <Resistor height={24} />}
      {type === ElectricalComponentType.Capacitor && <Capacitor height={24} />}
      {type === ElectricalComponentType.Inductor && <Inductor height={24} />}
      <Text fontSize="xx-small" position={"absolute"}>
        {value} {unit}
      </Text>
      <Terminal type="source" position={Position.Right} id="right" />
      <Terminal type="source" position={Position.Left} id="left" />
    </Box>
  );
}
