import { Box } from "@chakra-ui/react";
import { Node, NodeProps } from "@xyflow/react";
import React from "react";
import { ElectricalComponentData } from "../types";

type BoardNode = Node<ElectricalComponentData, "string">;

export default function Board({ selected }: NodeProps<BoardNode>) {
  return (
    <Box
      border="2px solid black"
      borderRadius="8px"
      height="100%"
      width="100%"
      {...(selected && { boxShadow: "black 0px 0px 4px" })}
    ></Box>
  );
}
