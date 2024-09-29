import { useState } from "react";
import { BaseEdge, EdgeProps, getSmoothStepPath } from "@xyflow/react";

export default function Wire({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  markerEnd,
}: EdgeProps) {
  const [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <BaseEdge
        path={edgePath}
        markerEnd={markerEnd}
        style={{
          strokeWidth: 1,
          width: 1,
          height: 1,
          stroke: "url(#edge-gradient)",
        }}
      />

      <circle
        style={{ filter: `drop-shadow(0px 0px 2px #FFC300` }}
        r="4"
        fill={`yellow`}
        className="circle"
      >
        <animateMotion dur="6s" repeatCount="indefinite" path={edgePath} />
      </circle>

      <circle
        fill="transparent"
        stroke={`yellow`}
        strokeWidth={2}
        className="circle"
      >
        <animate
          attributeName="r"
          values="2;6"
          dur="2s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="1;0"
          dur="2s"
          repeatCount="indefinite"
        />
        <animateMotion dur="6s" repeatCount="indefinite" path={edgePath} />
      </circle>
    </>
  );
}
