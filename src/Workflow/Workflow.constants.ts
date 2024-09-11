import { Edge, Node } from "@xyflow/react";
import { ElectricalComponentType } from "../types";

export const initialEdges: Edge[] = [
  {
    id: "1-2",
    source: "1",
    target: "2",
    type: "wire",
    data: { color: "#FFC300" },
  },
];

export const initialNodes: Node[] = [
  {
    id: "1",
    position: { x: 100, y: 100 },
    data: { type: ElectricalComponentType.Resistor },
    type: "electricalComponent",
  },
  {
    id: "2",
    data: { type: ElectricalComponentType.Capacitor },
    position: { x: 300, y: 20 },
    type: "electricalComponent",
  },
];
