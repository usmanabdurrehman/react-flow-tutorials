import { Box, Input, InputGroup, InputLeftAddon, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { Node, NodeProps, Position, useReactFlow } from "@xyflow/react";
import CustomHandle from "./CustomHandle";

type PaymentInitNode = Node<{ amount: number }, string>;

export default function PaymentInit({
  data: { amount },
  id,
}: NodeProps<PaymentInitNode>) {
  const { updateNodeData } = useReactFlow();
  const [amountValue, setAmountValue] = useState(`${amount || 0}`);

  return (
    <Box bg="white" border="1px solid #aa1fff">
      <Box bg="#410566" p={1}>
        <Text fontSize="medium" color="white">
          Payment Initialzer
        </Text>
      </Box>
      <Box p={2}>
        <InputGroup>
          <InputLeftAddon children="$" />
          <Input
            type="text"
            value={amountValue}
            width="150px"
            onChange={(e) => {
              setAmountValue(e.target.value);
              updateNodeData(id, { amount: e.target.value });
            }}
          />
        </InputGroup>
      </Box>
      <CustomHandle type="source" position={Position.Right} />
    </Box>
  );
}
