import { Box } from "@chakra-ui/react";
import {
  Node,
  NodeProps,
  NodeResizer,
  ReactFlowState,
  useStore,
} from "@xyflow/react";
import React, { useState } from "react";
import { useDarkMode } from "../store";
import Placeholder from "./Placeholder";
type BoardNode = Node<{}, "string">;

export default function Board({ selected }: NodeProps<BoardNode>) {
  const zoomSelector = (s: ReactFlowState) => s.transform[2] >= 0.9;
  const showContent = useStore(zoomSelector);

  const { isDark } = useDarkMode();
  let color = "black";
  if (isDark) color = "white";

  return (
    <Box
      height="100%"
      width="100%"
      borderRadius="8px"
      border={`2px solid ${color}`}
    >
      {!showContent && <Placeholder />}
      {selected && <NodeResizer minWidth={200} minHeight={200} />}
    </Box>
  );
}
