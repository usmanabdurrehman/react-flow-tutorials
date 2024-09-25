import { ConnectionLineComponentProps, useConnection } from "@xyflow/react";
import React from "react";
import { useDarkMode } from "../store";

export default function ConnectionLine({
  fromX,
  fromY,
  toY,
  toX,
  connectionStatus,
}: ConnectionLineComponentProps) {
  const { isDark } = useDarkMode();

  let color = "black";
  if (isDark) color = "white";
  if (connectionStatus === "valid") color = "#55dd99";
  if (connectionStatus === "invalid") color = "#ff6060";

  return (
    <path
      fill="none"
      stroke={color}
      strokeWidth={1.5}
      className="animated"
      d={`M${fromX},${fromY} C ${fromX} ${toY} ${fromX} ${toY} ${toX},${toY}`}
    />
  );
}
