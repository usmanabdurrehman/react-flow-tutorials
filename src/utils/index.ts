import { ReactFlowState } from "@xyflow/react";

export const zoomSelector = (s: ReactFlowState) => s.transform[2] >= 0.7;

export function isPointInBox(
  point: { x: number; y: number },
  box: { x: number; y: number; width: number; height: number }
) {
  return (
    point.x >= box.x &&
    point.x <= box.x + box.width &&
    point.y >= box.y &&
    point.y <= box.y + box.height
  );
}
