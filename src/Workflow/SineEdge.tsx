import { BaseEdge, type EdgeProps } from "@xyflow/react";

export default function SineEdge({
  sourceX,
  sourceY,
  markerEnd,
  targetX,
  targetY,
}: EdgeProps) {
  const path = `
  M ${sourceX} ${sourceY} 
  L ${sourceX} ${(targetY - sourceY) / 2 + sourceY} 
  Q ${(targetX - sourceX) * 0.25 + sourceX} ${targetY} ${
    (targetX - sourceX) * 0.5 + sourceX
  } ${(targetY - sourceY) / 2 + sourceY} 
  Q ${(targetX - sourceX) * 0.75 + sourceX} ${sourceY} ${
    targetX - sourceX + sourceX
  } ${(targetY - sourceY) / 2 + sourceY}
  L ${targetX} ${(targetY - sourceY) / 2 + sourceY} 
  L ${targetX} ${targetY}
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
