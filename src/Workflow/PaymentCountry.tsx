import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { Handle, Node, NodeProps, Position } from "reactflow";
import ReactCountryFlag from "react-country-flag";

export default function PaymentCountry({
  data: { country, currency, countryCode },
}: NodeProps<{ country: string; currency: string; countryCode: string }>) {
  console.log({ countryCode });

  return (
    <Flex
      alignItems={"center"}
      borderRadius="8px"
      bg="#e2e8f0"
      p={2}
      gap={2}
      width="150px"
    >
      <Box>
        <ReactCountryFlag
          countryCode={countryCode}
          style={{
            fontSize: "2em",
            lineHeight: "2em",
          }}
          svg
          aria-label={country}
        />
      </Box>
      <Flex grow="1">
        <Box>
          <Text>{country}</Text>
          <Text fontSize="x-small">{currency}</Text>
        </Box>
      </Flex>
      <Handle type="source" position={Position.Right} id="a" />
      <Handle type="target" position={Position.Left} id="b" />
    </Flex>
  );
}
