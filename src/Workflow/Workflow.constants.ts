import { Edge, MarkerType, Node } from "@xyflow/react";

export const initialNodes: Node[] = [
  {
    id: "1",
    position: { x: 0, y: 0 },
    data: {
      label: "Node 1",
    },
  },
  {
    id: "2",
    position: { x: 200, y: 200 },
    data: {
      label: "Node 2",
    },
  },
];

export const initialEdges: Edge[] = [
  {
    id: "1-2",
    source: "1",
    target: "2",
    type: "following",
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
];
