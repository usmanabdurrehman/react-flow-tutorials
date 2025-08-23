import { Edge } from "@xyflow/react";
import { At, Person } from "react-bootstrap-icons";
import { AppNode, NodeType } from "../types";

export const initialEdges: Edge[] = [];

export const initialNodes: AppNode[] = [
  {
    id: "1",
    position: { x: 0, y: 0 },
    data: {
      label: "Node 1",
    },
  },
  {
    id: "2",
    position: { x: 150, y: 150 },
    type: NodeType.Name,
    data: {
      name: "Alex",
    },
  },
  {
    id: "3",
    position: { x: 300, y: 300 },
    type: NodeType.Info,
    data: {
      email: "lol@yahoo.com",
      occupation: "Teacher",
    },
  },
  {
    id: "4",
    position: { x: 0, y: 300 },
    type: NodeType.Utility,
    data: {
      email: "lol@yahoo.com",
      occupation: "Teacher",
    },
    draggable: false,
  },
];

export const NodeTypeIconMap = {
  [NodeType.Name]: <Person />,
  [NodeType.Info]: <At />,
};

export const COMPONENTS = [
  {
    icon: NodeTypeIconMap[NodeType.Name],
    type: NodeType.Name,
    label: "Name",
  },
  {
    icon: NodeTypeIconMap[NodeType.Info],
    type: NodeType.Info,
    label: "Info",
  },
];
