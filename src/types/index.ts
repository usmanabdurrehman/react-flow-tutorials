import { BuiltInNode, Node } from "@xyflow/react";

export enum NodeType {
  Name = "name",
  Info = "info",
  Handle = "handle",
  Utility = "utility",
}

export type NameNode = Node<
  {
    name: string;
  },
  NodeType.Name
>;

export type InfoNode = Node<
  {
    email: string;
    occupation: string;
  },
  NodeType.Info
>;

export type HandleNode = Node<
  {
    label?: string;
    handles: { id: string; label: string }[];
  },
  NodeType.Handle
>;

export type UtilityNode = Node<{}, NodeType.Utility>;

export type AppNode =
  | InfoNode
  | NameNode
  | UtilityNode
  | HandleNode
  | BuiltInNode;
