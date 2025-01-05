import { BaseEdge, useReactFlow, type EdgeProps } from "@xyflow/react";
import { useRef, useState } from "react";

export default function EditableEdge2({
  sourceX,
  sourceY,
  markerEnd,
  targetX,
  targetY,
}: EdgeProps) {
  const { screenToFlowPosition } = useReactFlow();
  const [lineCoords, setLineCoords] = useState({
    x1: sourceX,
    y1: (targetY - sourceY) / 2 + sourceY,
    x2: targetX,
    y2: (targetY - sourceY) / 2 + sourceY,
  });

  const path = `
  M ${sourceX} ${sourceY} L ${lineCoords.x1} ${lineCoords.y1} L ${lineCoords.x2} ${lineCoords.y2} L ${targetX} ${targetY}
  `;

  const isMouseDown = useRef(false);
  const [showLine, setShowLine] = useState(false);

  return (
    <>
      <g onClick={() => setShowLine(true)}>
        <BaseEdge
          path={path}
          markerEnd={markerEnd}
          style={{ stroke: "#ff0073", strokeWidth: "2px" }}
        />
      </g>
      {showLine && (
        <line
          {...lineCoords}
          style={{ stroke: "#ff0073", strokeWidth: "4px" }}
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
              const newY = screenToFlowPosition(
                { x: dragX, y: dragY },
                { snapToGrid: false }
              ).y;
              setLineCoords({
                ...lineCoords,
                y1: newY,
                y2: newY,
              });
            }
          }}
        />
      )}
    </>
  );
}
