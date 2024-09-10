import { Box, Icon, IconButton } from "@chakra-ui/react";
import React from "react";
import { Plus } from "react-bootstrap-icons";
import { Node, NodeProps, Position } from "reactflow";
import { Capacitor, Resistor } from "../icons";
import {
  ElectricalComponentProps,
  ElectricalComponentState,
  ElectricalComponentType,
} from "../types";
import Terminal from "./Terminal";

export default function ElectricalComponent({
  data: { type, state },
}: NodeProps<ElectricalComponentProps>) {
  console.log({ type });
  let color = "black";
  if (state === ElectricalComponentState.Add) color = "green";
  return (
    <Box pos="relative">
      {type === ElectricalComponentType.Capacitor && (
        <Capacitor color={color} height={24} />
      )}
      {type === ElectricalComponentType.Resistor && (
        <Resistor color={color} height={24} />
      )}
      {state === ElectricalComponentState.Add && (
        <Plus
          style={{ position: "absolute", top: 10, right: 10 }}
          color={"green"}
        />
      )}
      <Terminal type="source" position={Position.Right} id="right" />
      <Terminal type="target" position={Position.Left} id="left" />
    </Box>
  );
}
