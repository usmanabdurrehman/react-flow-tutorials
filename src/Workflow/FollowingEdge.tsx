import {
  BaseEdge,
  useInternalNode,
  getSmoothStepPath,
  type EdgeProps,
  InternalNode,
  Node,
  getStraightPath,
} from "@xyflow/react";

import { Position } from "@xyflow/react";

function getNodeIntersection(
  intersectionNode: InternalNode<Node>,
  sourceNode: InternalNode<Node>
) {
  const intersectionNodePosition = intersectionNode.position;
  const targetPosition = sourceNode.position;

  const intersectionNodeHalfWidth = (intersectionNode.measured.width || 0) / 2;
  const intersectionNodeHalfHeight =
    (intersectionNode.measured.height || 0) / 2;

  // Finding Center Points of both nodes
  const intersectionNodeCenterX =
    intersectionNodePosition.x + intersectionNodeHalfWidth;
  const intersectionNodeCenterY =
    intersectionNodePosition.y + intersectionNodeHalfHeight;
  const sourceNodeCenterX =
    targetPosition.x + (sourceNode.measured.width || 0) / 2;
  const sourceNodeCenterY =
    targetPosition.y + (sourceNode.measured.height || 0) / 2;

  // Normalizing X,Y Distance between nodes
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

  // Scaling it properly
  const a = 1 / (Math.abs(xx1) + Math.abs(yy1) || 1);
  const xx3 = a * xx1;
  const yy3 = a * yy1;
  const x = intersectionNodeHalfWidth * (xx3 + yy3) + intersectionNodeCenterX;
  const y = intersectionNodeHalfHeight * (-xx3 + yy3) + intersectionNodeCenterY;

  return { x, y };
}

function getEdgePosition(
  node: InternalNode<Node>,
  intersectionPoint: { x: number; y: number }
) {
  const nx = Math.round(node.position.x);
  const ny = Math.round(node.position?.y);
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
  if (py >= node.position?.y + (node.measured.height || 0) - 1) {
    return Position.Bottom;
  }

  return Position.Top;
}

function getEdgeParams(source: InternalNode<Node>, target: InternalNode<Node>) {
  const targetIntersectionPoint = getNodeIntersection(target, source);

  const targetPosition = getEdgePosition(target, targetIntersectionPoint);

  return {
    targetX: targetIntersectionPoint.x,
    targetY: targetIntersectionPoint.y,
    targetPosition,
  };
}

export default function FollowingEdge({
  sourceX,
  sourceY,
  style = {},
  markerEnd,
  source,
  target,
}: EdgeProps) {
  const sourceNode = useInternalNode(source);
  const targetNode = useInternalNode(target);

  if (!sourceNode || !targetNode) {
    return null;
  }

  const { targetX, targetY, targetPosition } = getEdgeParams(
    sourceNode,
    targetNode
  );

  const [edgePath] = getStraightPath({
    // targetPosition,
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />;
}
