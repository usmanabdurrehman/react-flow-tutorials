import { Box, Flex, Icon, Image, Text } from "@chakra-ui/react";
import React from "react";
import { Handle, Node, NodeProps, Position } from "reactflow";

const PAYMENT_PROVIDER_IMAGE_MAP: { [code: string]: string } = {
  St: "https://cdn.worldvectorlogo.com/logos/stripe-2.svg",
  Ap: "https://cdn.worldvectorlogo.com/logos/apple-14.svg",
  Gp: "https://cdn.worldvectorlogo.com/logos/google-g-2015.svg",
};

export default function PaymentProvider({
  data: { code, name },
}: NodeProps<{ code: string; name: string }>) {
  return (
    <Flex
      borderRadius={"24px"}
      border="2px solid #5e5eff"
      alignItems={"center"}
      bg="white"
      p={1}
      pb={2}
      pl={"12px"}
      gap={2}
      width="120px"
    >
      <Box h={4} w={4}>
        <Image
          height="100%"
          width="100%"
          src={PAYMENT_PROVIDER_IMAGE_MAP[code]}
        />
      </Box>
      <Flex grow="1">
        <Text fontSize="small">{name}</Text>
      </Flex>
      <Handle type="target" position={Position.Left} id="b" />
    </Flex>
  );
}
