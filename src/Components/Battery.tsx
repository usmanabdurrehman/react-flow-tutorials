import { Node, NodeProps, Position } from "@xyflow/react";
import React, { useState } from "react";
import { Battery as BatteryIcon } from "../icons";
import Terminal from "./Terminal";
import { useDarkMode } from "../store";
import Rotator from "./Rotator";
import ColoredBattery from "../icons/Battery";
import { getUnit } from "../utils";
import { ElectricalComponentData, ElectricalComponentType } from "../types";
import { Text } from "@chakra-ui/react";

type BatteryNode = Node<ElectricalComponentData, "string">;

export default function Battery({
  data: { visible = true, connectable, value },
  type,
}: NodeProps<BatteryNode>) {
  const { isDark } = useDarkMode();
  let color = "black";
  if (isDark) color = "white";

  const unit = getUnit(type as ElectricalComponentType);

  return (
    <div
      style={{
        visibility: visible ? "visible" : "hidden",
        position: "relative",
      }}
    >
      <Text
        fontSize="xx-small"
        pos="absolute"
        top="22px"
        left="14px"
        color="white"
      >
        {value} {unit}
      </Text>
      <ColoredBattery height={48} color={color} />
      <Terminal
        type="source"
        position={Position.Top}
        id="left"
        isConnectable={connectable}
        style={{ left: 9, top: 2 }}
      />
      <Terminal
        type="source"
        position={Position.Top}
        id="right"
        isConnectable={connectable}
        style={{ left: 39, top: 2 }}
      />
    </div>
  );
}
