import { Node, NodeProps, useReactFlow } from "@xyflow/react";
import { Box, Select, Textarea } from "@chakra-ui/react";
import {
  PAYMENT_PROVIDER_IMAGE_MAP,
  PAYMENT_PROVIDERS,
} from "../constants/dummy";
import React, { useMemo } from "react";
import { Cash } from "react-bootstrap-icons";

import { Flex, useDisclosure } from "@chakra-ui/react";

import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";

type PaymentGatewayNode = Node<
  {
    gatewayId: string;
    details: string;
  },
  "string"
>;

const PaymentGateway = React.memo(
  ({
    id,
    data: { gatewayId, details },
    selected,
  }: NodeProps<PaymentGatewayNode>) => {
    const paymentGateway = useMemo(
      () => PAYMENT_PROVIDERS.find((gateway) => gateway.id === gatewayId),
      [gatewayId]
    );

    const { updateNodeData } = useReactFlow();

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
      <>
        <Flex
          onClick={onOpen}
          pl={2}
          pr={2}
          bg="white"
          border={`${selected ? 2 : 1}px solid "#06e506"`}
          borderRadius="8px"
          boxShadow="sm"
          alignItems={"center"}
          gap={2}
          minWidth={"240px"}
          height="40px"
        >
          <Cash />
          <Box fontSize="sm" flex="1">
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
          </Box>
        </Flex>
        <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />

            <DrawerBody mt={8}>
              <Box>
                <Select
                  placeholder="Select Payment Gateway"
                  mt={2}
                  value={gatewayId}
                  onChange={(e) =>
                    updateNodeData(id, { gatewayId: e.target.value })
                  }
                >
                  {PAYMENT_PROVIDERS.map((order) => (
                    <option value={order.id}>{order.name}</option>
                  ))}
                </Select>
                <Textarea
                  value={details}
                  onChange={(e) =>
                    updateNodeData(id, { details: e.target.value })
                  }
                  placeholder="Enter Details"
                  mt={4}
                />
              </Box>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </>
    );
  }
);

export default PaymentGateway;
