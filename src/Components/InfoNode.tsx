import React from "react";
import { Node, NodeProps, useReactFlow } from "@xyflow/react";
import { Box, Textarea } from "@chakra-ui/react";
import { InfoNode as InfoNodeType } from "../types";

const InfoNode = React.memo(function CustomNode({
  id,
  data: { email, occupation },
}: NodeProps<InfoNodeType>) {
  const { updateNodeData } = useReactFlow();

  return (
    <Box p={2} border="1px solid black">
      <p>{email}</p>
      <p>{occupation}</p>
    </Box>
  );
});

export default InfoNode;
