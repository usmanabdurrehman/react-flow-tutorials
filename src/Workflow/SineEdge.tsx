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

export default function SineEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
}: EdgeProps) {
  const centerY = (targetY - sourceY) / 2 + sourceY;
  const centerX = (targetX - sourceX) / 2 + sourceX;

  const edgePath = `
  M ${sourceX} ${sourceY} 
  L ${sourceX} ${centerY} 
  Q ${(targetX - sourceX) * 0.25 + sourceX} ${targetY} ${centerX} ${centerY}
  Q ${(targetX - sourceX) * 0.75 + sourceX} ${sourceY} ${targetX} ${centerY}
  L ${targetX} ${centerY} 
  L ${targetX} ${targetY}`;

  return (
    <>
      <BaseEdge id={id} path={edgePath} />
    </>
  );
}
