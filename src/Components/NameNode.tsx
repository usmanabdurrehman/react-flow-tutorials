import React from "react";
import { NodeProps, useReactFlow } from "@xyflow/react";
import { Box } from "@chakra-ui/react";
import {
  AppNode,
  InfoNode,
  NameNode as NameNodeType,
  NodeType,
} from "../types";

const isInfoNode = (node: AppNode): node is InfoNode => {
  return node.type === NodeType.Info;
};

const NameNode = React.memo(function CustomNode({
  id,
  data: { name },
}: NodeProps<NameNodeType>) {
  const { getNodes } = useReactFlow<AppNode>();

  const infoNodes = getNodes().filter(isInfoNode);

  return (
    <Box p={2} border="1px solid black">
      <p>{name}</p>
    </Box>
  );
});

export default NameNode;
