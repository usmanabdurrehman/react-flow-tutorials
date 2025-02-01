import { Edge, Node } from "@xyflow/react";
import { Cash, ListCheck } from "react-bootstrap-icons";

export const initialEdges: Edge[] = [];

export const initialNodes: Node[] = [];

export enum NodeType {
  PaymentGateway = "paymentGateway",
  Order = "order",
}

export const NodeTypeIconMap = {
  [NodeType.PaymentGateway]: <Cash />,
  [NodeType.Order]: <ListCheck />,
};

export const COMPONENTS = [
  {
    icon: NodeTypeIconMap[NodeType.Order],
    type: NodeType.Order,
    label: "Order",
  },
  {
    icon: NodeTypeIconMap[NodeType.PaymentGateway],
    type: NodeType.PaymentGateway,
    label: "Payment Gateway",
  },
];
