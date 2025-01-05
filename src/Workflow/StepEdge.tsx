import { BaseEdge, type EdgeProps } from "@xyflow/react";

export default function StepEdge({
  sourceX,
  sourceY,
  markerEnd,
  targetX,
  targetY,
  id,
}: EdgeProps) {
  const path = `
  M ${sourceX} ${sourceY} L ${sourceX} ${
    (targetY - sourceY) / 2 + sourceY
  } L ${targetX} ${(targetY - sourceY) / 2 + sourceY} L ${targetX} ${targetY}
  `;

  return (
    <>
      <BaseEdge
        path={path}
        markerEnd={markerEnd}
        style={{ stroke: "#ff0073", strokeWidth: "2px" }}
      />
    </>
  );
}
