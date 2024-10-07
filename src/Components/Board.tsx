import { Box } from "@chakra-ui/react";
import { Node, NodeProps, NodeResizer, useStore } from "@xyflow/react";
import React from "react";
import { ElectricalComponentData } from "../types";
import Placeholder from "./Placeholder";
import { zoomSelector } from "../utils";
import { useDarkMode } from "../store";

type BoardNode = Node<ElectricalComponentData, "string">;

export default function Board({ selected }: NodeProps<BoardNode>) {
  const showContent = useStore(zoomSelector);

  const { isDark } = useDarkMode();

  let color = "black";
  if (isDark) color = "white";

  return (
    <Box
      border={`2px solid ${color}`}
      borderRadius="8px"
      height="100%"
      width="100%"
      {...(selected && { boxShadow: `${color} 0px 0px 4px` })}
    >
      {selected && <NodeResizer minWidth={200} minHeight={200} />}
      {!showContent && <Placeholder />}
    </Box>
  );
}
