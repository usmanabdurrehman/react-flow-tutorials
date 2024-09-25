import { useState } from "react";
import {
  getBezierPath,
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getSmoothStepPath,
} from "@xyflow/react";

export default function Wire({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  label,
  markerEnd,
}: EdgeProps) {
  const [edgePath, labelX, labelY] = getSmoothStepPath({
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

      {label && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: "absolute",
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              fontSize: 12,
              backgroundColor: "#EEF0F6",
              fill: "#EEF0F6",
              pointerEvents: "all",
              padding: "4px",
            }}
            className="nodrag nopan"
          >
            {label}
          </div>
        </EdgeLabelRenderer>
      )}

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
