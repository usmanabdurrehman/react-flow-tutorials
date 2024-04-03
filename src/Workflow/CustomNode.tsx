import { Box, Text } from "@chakra-ui/react";
import { useCallback } from "react";
import { Handle, NodeProps, Position } from "reactflow";

export const CustomNode = ({ data }: NodeProps) => {
  return (
    <Box
      bg="#071769"
      h={"60px"}
      display="flex"
      p={8}
      alignItems={"center"}
      justifyContent="center"
      width="150px"
    >
      <Text fontSize="medium" color="white">
        {data?.label}
      </Text>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} id="a" />
      <Handle type="source" position={Position.Left} id="b" />
    </Box>
  );
};
