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

export default function EditableEdge2({
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

  const [lineCoords, setLineCoords] = useState({
    x1: sourceX,
    y1: centerY,
    x2: targetX,
    y2: centerY,
  });

  const edgePath = `M ${sourceX} ${sourceY} L ${lineCoords?.x1} ${lineCoords?.y1} L ${lineCoords?.x2} ${lineCoords?.y2} L ${targetX} ${targetY}`;

  const isMouseDown = useRef(false);

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        style={{ stroke: "#ff0473", strokeWidth: "2px" }}
      />

      <line
        {...lineCoords}
        fill="#ff0066"
        tabIndex={0}
        style={{ stroke: "#ff0073", strokeWidth: "4px" }}
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

          const newY = screenToFlowPosition(
            { x: dragX, y: dragY },
            { snapToGrid: false }
          )?.y;
          setLineCoords({
            ...lineCoords,
            y1: newY,
            y2: newY,
          });
        }}
      />
    </>
  );
}
