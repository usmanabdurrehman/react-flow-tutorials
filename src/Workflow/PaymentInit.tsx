import { Box, Text } from "@chakra-ui/react";
import { NodeProps, Position } from "reactflow";
import CustomHandle from "./CustomHandle";

export default function PaymentInit({ data }: NodeProps<{ amount: number }>) {
  return (
    <Box bg="white" border="1px solid #aa1fff">
      <Box bg="#410566" p={1}>
        <Text fontSize="small" color="white">
          Payment Initiated
        </Text>
      </Box>
      <Box p={2}>
        <Text color="blue.600" fontSize="2xl">
          ${data.amount}
        </Text>
      </Box>
      <CustomHandle type="source" position={Position.Right} id="paymentInit" />
    </Box>
  );
}
