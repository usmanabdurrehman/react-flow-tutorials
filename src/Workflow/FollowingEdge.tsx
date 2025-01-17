import { IconButton } from "@chakra-ui/react";
import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  InternalNode,
  Node,
  Position,
  getSmoothStepPath,
  getStraightPath,
  useInternalNode,
} from "@xyflow/react";
import { Trash } from "react-bootstrap-icons";

const getNodeIntersection = (
  intersectionNode: InternalNode<Node>,
  sourceNode: InternalNode<Node>
) => {
  const intersectionNodePosition = intersectionNode.position;
  const sourcePosition = sourceNode.position;

  const intersectionNodeHalfWidth = (intersectionNode.measured.width || 0) / 2;
  const intersectionNodeHalfHeight =
    (intersectionNode.measured.height || 0) / 2;

  const sourceNodeHalfWidth = (sourceNode.measured.width || 0) / 2;
  const sourceNodeHalfHeight = (sourceNode.measured.height || 0) / 2;

  const intersectionNodeCenterX =
    intersectionNodePosition.x + intersectionNodeHalfWidth;
  const intersectionNodeCenterY =
    intersectionNodePosition.y + intersectionNodeHalfHeight;

  const sourceNodeCenterX = sourcePosition.x + sourceNodeHalfWidth;
  const sourceNodeCenterY = sourcePosition.y + sourceNodeHalfHeight;

  const xx1 =
    (sourceNodeCenterX - intersectionNodeCenterX) /
      (2 * intersectionNodeHalfWidth) -
    (sourceNodeCenterY - intersectionNodeCenterY) /
      (2 * intersectionNodeHalfHeight);

  const yy1 =
    (sourceNodeCenterX - intersectionNodeCenterX) /
      (2 * intersectionNodeHalfWidth) +
    (sourceNodeCenterY - intersectionNodeCenterY) /
      (2 * intersectionNodeHalfHeight);

  const a = 1 / (Math.abs(xx1) + Math.abs(yy1) || 1);

  const xx3 = a * xx1;
  const yy3 = a * yy1;

  const x = intersectionNodeHalfWidth * (xx3 + yy3) + intersectionNodeCenterX;
  const y = intersectionNodeHalfHeight * (-xx3 + yy3) + intersectionNodeCenterY;

  return { x, y };
};

const getEdgePosition = (
  node: InternalNode<Node>,
  intersectionPoint: { x: number; y: number }
) => {
  const nx = Math.round(node.position.x);
  const ny = Math.round(node.position.y);
  const px = Math.round(intersectionPoint.x);
  const py = Math.round(intersectionPoint.y);

  if (px <= nx + 1) {
    return Position.Left;
  }
  if (px >= nx + (node.measured.width || 0) - 1) {
    return Position.Right;
  }

  if (py <= ny + 1) {
    return Position.Top;
  }

  if (py >= ny + (node.measured.height || 0) - 1) {
    return Position.Bottom;
  }

  return Position.Top;
};

const getEdgeParams = (
  sourceNode: InternalNode<Node>,
  targetNode: InternalNode<Node>
) => {
  const targetIntersectionPoint = getNodeIntersection(targetNode, sourceNode);
  const sourceIntersectionPoint = getNodeIntersection(sourceNode, targetNode);

  const targetPosition = getEdgePosition(targetNode, targetIntersectionPoint);
  const sourcePosition = getEdgePosition(sourceNode, sourceIntersectionPoint);

  return {
    targetX: targetIntersectionPoint.x,
    targetY: targetIntersectionPoint.y,
    sourceX: sourceIntersectionPoint.x,
    sourceY: sourceIntersectionPoint.y,
    targetPosition,
    sourcePosition,
  };
};

export default function FollowingEdge({
  id,
  sourceX,
  sourceY,
  markerEnd,
  source,
  target,
}: EdgeProps) {
  const sourceNode = useInternalNode(source);
  const targetNode = useInternalNode(target);

  if (!sourceNode || !targetNode) {
    return null;
  }

  const params = getEdgeParams(sourceNode, targetNode);

  const [edgePath] = getSmoothStepPath(params);

  return (
    <>
      <BaseEdge id={id} path={edgePath} markerEnd={markerEnd} />
    </>
  );
}
