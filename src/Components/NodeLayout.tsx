import { Box, Flex, useDisclosure } from "@chakra-ui/react";
import React from "react";

import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { NodeType, NodeTypeIconMap } from "../constants";

export default function NodeLayout({
  children,
  type,
  display,
}: {
  children: React.ReactNode;
  type: NodeType;
  display: React.ReactNode;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  let border;
  switch (type) {
    case NodeType.Order: {
      border = "#5454ff";
      break;
    }
    case NodeType.PaymentGateway: {
      border = "#06e506";
      break;
    }
  }

  return (
    <>
      <Flex
        onClick={onOpen}
        pl={2}
        pr={2}
        bg="white"
        border={`2px solid ${border}`}
        borderRadius="8px"
        boxShadow="sm"
        alignItems={"center"}
        gap={2}
        minWidth={"240px"}
        height="40px"
      >
        {NodeTypeIconMap[type]}
        <Box fontSize="sm" flex="1">
          {display}
        </Box>
      </Flex>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />

          <DrawerBody mt={8}>{children}</DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
