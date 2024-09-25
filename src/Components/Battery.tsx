import { Node, NodeProps, Position } from "@xyflow/react";
import React, { useState } from "react";
import { Battery as BatteryIcon } from "../icons";
import Terminal from "./Terminal";
import { useDarkMode } from "../store";
import Rotator from "./Rotator";

type BatteryNode = Node<
  { visible: boolean; connectable: boolean; rotation: boolean },
  "string"
>;

export default function Battery({
  data: { visible = true, connectable, rotation },
  id,
  selected,
}: NodeProps<BatteryNode>) {
  const { isDark } = useDarkMode();
  let color = "black";
  if (isDark) color = "white";

  return (
    <div
      style={{
        transform: `rotate(${rotation}deg)`,
        visibility: visible ? "visible" : "hidden",
      }}
    >
      <BatteryIcon height={48} color={color} />
      <Terminal
        type="source"
        position={Position.Top}
        id="top"
        isConnectable={connectable}
      />
      <Terminal
        type="source"
        position={Position.Bottom}
        id="bottom"
        isConnectable={connectable}
      />
      <Rotator id={id} selected={selected} />
    </div>
  );
}
