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

  /*
    const [edgePath, labelX, labelY] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });
  */

  return (
    <>
      <BaseEdge
        path={edgePath}
        markerEnd={markerEnd}
        style={{ stroke: "yellow", strokeWidth: 1 }}
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
        style={{ filter: `drop-shadow(3px 3px 5px #FFC300` }}
        r="4"
        fill={`yellow`}
        className="circle"
      >
        <animateMotion dur="6s" repeatCount="indefinite" path={edgePath} />
      </circle>
    </>
  );
}
