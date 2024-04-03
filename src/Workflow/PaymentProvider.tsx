import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { NodeProps, Position } from "reactflow";
import CustomHandle from "./CustomHandle";

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
      pb={1}
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
        <Text mt={"-2px"} fontSize="small">
          {name}
        </Text>
      </Flex>
      <CustomHandle type="target" position={Position.Left} id="b" />
    </Flex>
  );
}
