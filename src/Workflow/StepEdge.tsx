import { IconButton } from "@chakra-ui/react";
import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  Position,
  getSmoothStepPath,
  getStraightPath,
} from "@xyflow/react";
import { Trash } from "react-bootstrap-icons";

export default function StepEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
}: EdgeProps) {
  const centerY = (targetY - sourceY) / 2 + sourceY;

  const edgePath = `M ${sourceX} ${sourceY} L ${sourceX} ${centerY} L ${targetX} ${centerY} L ${targetX} ${targetY}`;

  return (
    <>
      <BaseEdge id={id} path={edgePath} />
    </>
  );
}
