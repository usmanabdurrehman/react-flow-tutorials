import { Position } from "@xyflow/react";
import React from "react";
import { Battery as BatteryIcon } from "../icons";
import Terminal from "./Terminal";

export default function Battery() {
  return (
    <div>
      <BatteryIcon height={48} />
      <Terminal type="target" position={Position.Top} id="top" />
      <Terminal type="source" position={Position.Bottom} id="bottom" />
    </div>
  );
}
