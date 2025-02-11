import React, { useMemo } from "react";
import NodeLayout from "./NodeLayout";
import { Node, NodeProps, useReactFlow } from "@xyflow/react";
import { NodeType } from "../constants";
import { Box, Flex, Text } from "@chakra-ui/react";
import { ORDERS } from "../constants/dummy";
import { useWatch } from "react-hook-form";
import ControlledInput from "./Controlled/ControlledInput";
import ControlledSelect from "./Controlled/ControlledSelect";
import ControlledTextArea from "./Controlled/ControlledTextArea";
import ControlledSwitch from "./Controlled/ControlledSwitch";
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

const Order = React.memo(function Order({ id }: NodeProps<OrderNode>) {
  console.log("order node is rerendering");

  const orderId = useWatch({ name: `${id}.orderId` });

  const order = useMemo(
    () => ORDERS.find((order) => order.id === orderId),
    [orderId]
  );

  return (
    <NodeLayout
      type={NodeType.Order}
      display={order ? `Order ${order?.name}` : `Order`}
    >
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
}, memoComparator);

export default Order;
