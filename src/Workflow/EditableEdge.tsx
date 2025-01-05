import { BaseEdge, useReactFlow, type EdgeProps } from "@xyflow/react";
import { useRef, useState } from "react";

export default function EditableEdge({
  sourceX,
  sourceY,
  markerEnd,
  targetX,
  targetY,
}: EdgeProps) {
  const { screenToFlowPosition } = useReactFlow();

  // const [{ x, y }, setXY] = useState({
  //   x: sourceX,
  //   y: (targetY - sourceY) / 2 + sourceY,
  // });

  const [points, setPoints] = useState([
    {
      x: sourceX,
      y: (targetY - sourceY) / 2 + sourceY,
    },
    {
      x: targetX,
      y: (targetY - sourceY) / 2 + sourceY,
    },
  ]);

  const path = `
  M ${sourceX} ${sourceY} L ${points?.[0]?.x} ${points?.[0]?.y} L ${points?.[1]?.x} ${points?.[1]?.y} L ${targetX} ${targetY}
  `;

  const isMouseDown = useRef(false);

  return (
    <>
      <BaseEdge
        path={path}
        markerEnd={markerEnd}
        style={{ stroke: "#ff0073", strokeWidth: "2px" }}
      />
      {points.map((point, index) => (
        <circle
          style={{ pointerEvents: "all" }}
          cx={point.x}
          cy={point.y}
          fill="#ff0066"
          stroke="white"
          strokeWidth="2px"
          r={"6px"}
          tabIndex={0}
          onMouseDown={() => {
            isMouseDown.current = true;
          }}
          onMouseLeave={() => {
            isMouseDown.current = false;
          }}
          onMouseUp={() => {
            isMouseDown.current = false;
          }}
          onMouseMove={(evt) => {
            if (isMouseDown.current) {
              evt.preventDefault();
              const dragX = evt.clientX;
              const dragY = evt.clientY;
              const newPoints = [...points];
              newPoints[index] = screenToFlowPosition(
                { x: dragX, y: dragY },
                { snapToGrid: false }
              );
              setPoints(newPoints);
            }
          }}
        />
      ))}
    </>
  );
}
