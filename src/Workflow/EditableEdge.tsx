import { IconButton } from "@chakra-ui/react";
import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  Position,
  getSmoothStepPath,
  getStraightPath,
  useReactFlow,
} from "@xyflow/react";
import { useRef, useState } from "react";
import { Trash } from "react-bootstrap-icons";

export default function EditableEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
}: EdgeProps) {
  const centerY = (targetY - sourceY) / 2 + sourceY;
  const { screenToFlowPosition } = useReactFlow();

  const [points, setPoints] = useState([
    { x: sourceX, y: centerY },
    { x: targetX, y: centerY },
  ]);

  const edgePath = `M ${sourceX} ${sourceY} L ${points?.[0]?.x} ${points?.[0]?.y} L ${points?.[1]?.x} ${points?.[1]?.y} L ${targetX} ${targetY}`;

  const isMouseDown = useRef(false);

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        style={{ stroke: "#ff0473", strokeWidth: "2px" }}
      />
      {points.map((point, index) => {
        return (
          <circle
            fill="#ff0066"
            stroke="white"
            strokeWidth={1}
            cx={point.x}
            cy={point.y}
            r="6px"
            style={{ pointerEvents: "all" }}
            tabIndex={0}
            onMouseDown={() => {
              isMouseDown.current = true;
            }}
            onMouseUp={() => {
              isMouseDown.current = false;
            }}
            onMouseLeave={() => {
              isMouseDown.current = false;
            }}
            onMouseMove={(e) => {
              if (!isMouseDown.current) return;
              e.preventDefault();
              const dragX = e.clientX;
              const dragY = e.clientY;

              const pointsArr = [...points];
              pointsArr[index] = screenToFlowPosition(
                { x: dragX, y: dragY },
                { snapToGrid: false }
              );
              setPoints(pointsArr);
            }}
          />
        );
      })}
    </>
  );
}
