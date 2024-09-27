import {
  ConnectionLineComponentProps,
  getSimpleBezierPath,
} from "@xyflow/react";
import { useDarkMode } from "../store";

export default function ConnectionLine({
  fromX,
  fromY,
  toY,
  toX,
  connectionStatus,
}: ConnectionLineComponentProps) {
  const { isDark } = useDarkMode();

  const [d] = getSimpleBezierPath({
    sourceX: fromX,
    sourceY: fromY,
    targetY: toY,
    targetX: toX,
  });

  let color = "black";
  if (isDark) color = "white";
  if (connectionStatus === "valid") color = "#55dd99";
  if (connectionStatus === "invalid") color = "#ff6060";

  return <path fill="none" stroke={color} strokeWidth={1.5} d={d} />;
}
