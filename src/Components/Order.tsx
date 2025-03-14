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
import ControlledSelect from "./Controlled/ControlledSelect";
import ControlledInput from "./Controlled/ControlledInput";
import ControlledTextArea from "./Controlled/ControlledTextArea";
import ControlledSwitch from "./Controlled/ControlledSwitch";
import { useWatch } from "react-hook-form";
import { memoComparator } from "../utils/memoComparator";

type OrderNode = Node<
  {
    quantity: number;
    orderId: string;
    details: string;
    enableDiscount: boolean;
  },
  "string"
>;

const Order = React.memo(function Order({
  id,
  type,
  data,
}: NodeProps<OrderNode>) {
  const [orderId, quantity] = useWatch({
    name: [`${id}.orderId`, `${id}.quantity`],
  });

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
        <ControlledSelect
          name={`${id}.orderId`}
          placeholder="Select Order"
          mt={2}
        >
          {ORDERS.map((order) => (
            <option value={order.id}>{order.name}</option>
          ))}
        </ControlledSelect>
        <ControlledInput
          name={`${id}.quantity`}
          placeholder="Enter Quantity"
          mt={4}
          type="number"
          step="any"
        />
        <ControlledTextArea
          name={`${id}.details`}
          placeholder="Enter Details"
          mt={4}
        />
        <Flex gap={2} alignItems={"center"} mt={4}>
          <Text fontSize="sm">Enable Discount?</Text>
          <ControlledSwitch name={`${id}.enableDiscount`} />
        </Flex>
      </Box>
    </NodeLayout>
  );
},
memoComparator);

export default Order;
