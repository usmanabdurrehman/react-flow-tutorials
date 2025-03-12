import React, { useMemo } from "react";
import NodeLayout from "./NodeLayout";
import { Node, NodeProps, useReactFlow } from "@xyflow/react";
import { NodeType } from "../constants";
import {
  Box,
  Flex,
  Input,
  Select,
  Switch,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { ORDERS } from "../constants/dummy";

type OrderNode = Node<
  {
    quantity: number;
    orderId: string;
    details: string;
    enableDiscount: boolean;
  },
  "string"
>;

const Order = function Order({
  id,
  type,
  data: { quantity, orderId, enableDiscount, details },
}: NodeProps<OrderNode>) {
  const { updateNodeData } = useReactFlow();

  const order = useMemo(
    () => ORDERS.find((order) => order.id === orderId),
    [orderId]
  );

  let display = "";
  if (order?.name) display += `Order ${order?.name}`;
  if (order && quantity) display += `, Q: ${quantity}`;
  if (!order) display += "Order";

  console.log("order node is rerendering");

  return (
    <NodeLayout type={NodeType.Order} display={display}>
      <Box>
        <Select
          onChange={(e) => updateNodeData(id, { orderId: e.target.value })}
          value={orderId}
          placeholder="Select Order"
          mt={2}
        >
          {ORDERS.map((order) => (
            <option value={order.id}>{order.name}</option>
          ))}
        </Select>
        <Input
          onChange={(e) => updateNodeData(id, { quantity: e.target.value })}
          value={quantity}
          placeholder="Enter Quantity"
          mt={4}
          type="number"
          step="any"
        />
        <Textarea
          onChange={(e) => updateNodeData(id, { details: e.target.value })}
          value={details}
          placeholder="Enter Details"
          mt={4}
        />
        <Flex gap={2} alignItems={"center"} mt={4}>
          <Text fontSize="sm">Enable Discount?</Text>
          <Switch
            isChecked={enableDiscount}
            onChange={(e) =>
              updateNodeData(id, { enableDiscount: e.target.checked })
            }
          />
        </Flex>
      </Box>
    </NodeLayout>
  );
};

export default Order;
