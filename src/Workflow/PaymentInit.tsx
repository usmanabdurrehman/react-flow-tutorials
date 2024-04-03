import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { Handle, Node, NodeProps, Position } from "reactflow";

export default function PaymentInit({ data }: NodeProps<{ amount: number }>) {
  return (
    <Box borderRadius={"12px"} bg="white">
      <Box bg="blue" p={1}>
        <Text fontSize="sm" color="white">
          Payment Initiated
        </Text>
      </Box>
      <Box p={2}>
        <Text color="blue.600" fontSize="2xl">
          ${data.amount}
        </Text>
      </Box>
      <Handle type="source" position={Position.Right} id="b" />
    </Box>
  );
}
