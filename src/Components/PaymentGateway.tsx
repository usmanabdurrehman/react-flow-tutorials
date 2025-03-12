import NodeLayout from "./NodeLayout";
import { Node, NodeProps, useReactFlow } from "@xyflow/react";
import { NodeType } from "../constants";
import { Box, Select } from "@chakra-ui/react";
import {
  PAYMENT_PROVIDER_IMAGE_MAP,
  PAYMENT_PROVIDERS,
} from "../constants/dummy";
import React, { useMemo } from "react";

type PaymentGatewayNode = Node<
  {
    gatewayId: string;
  },
  "string"
>;

const PaymentGateway = ({
  id,
  type,
  data: { gatewayId },
}: NodeProps<PaymentGatewayNode>) => {
  const { updateNodeData } = useReactFlow();

  const paymentGateway = useMemo(
    () => PAYMENT_PROVIDERS.find((gateway) => gateway.id === gatewayId),
    [gatewayId]
  );

  console.log("payment gateway node is rendering");

  return (
    <NodeLayout
      type={NodeType.PaymentGateway}
      display={
        <Box>
          {paymentGateway ? (
            <img
              src={PAYMENT_PROVIDER_IMAGE_MAP[paymentGateway?.code]}
              width="20px"
              height="20px"
            />
          ) : (
            "Payment Gateway"
          )}
        </Box>
      }
    >
      <Box>
        <Select
          onChange={(e) => updateNodeData(id, { gatewayId: e.target.value })}
          value={gatewayId}
          placeholder="Select Payment Gateway"
          mt={2}
        >
          {PAYMENT_PROVIDERS.map((order) => (
            <option value={order.id}>{order.name}</option>
          ))}
        </Select>
      </Box>
    </NodeLayout>
  );
};

export default PaymentGateway;
