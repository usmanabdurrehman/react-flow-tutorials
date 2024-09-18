import { Position } from "@xyflow/react";
import React from "react";
import { Battery as BatteryIcon } from "../icons";
import Terminal from "./Terminal";
import { useDarkMode } from "../store";

export default function Battery() {
  const { isDark } = useDarkMode();
  let color = "black";
  if (isDark) color = "white";

  return (
    <div>
      <BatteryIcon height={48} color={color} />
      <Terminal type="source" position={Position.Top} id="top" />
      <Terminal type="source" position={Position.Bottom} id="bottom" />
    </div>
  );
}
