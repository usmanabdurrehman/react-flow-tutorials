import { Box, Flex, Text } from "@chakra-ui/react";
import { NodeProps, Position } from "reactflow";
import ReactCountryFlag from "react-country-flag";
import CustomHandle from "./CustomHandle";

export default function PaymentCountry({
  data: { country, currency, countryCode },
}: NodeProps<{ country: string; currency: string; countryCode: string }>) {
  return (
    <Flex
      alignItems={"center"}
      borderRadius="8px"
      bg="#e2e8f0"
      border="2px solid #bbbdbf"
      p={2}
      gap={2}
      width="155px"
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
      <CustomHandle
        type="source"
        position={Position.Right}
        id="paymentCountrySource"
      />
      <CustomHandle
        type="target"
        position={Position.Left}
        id="paymentCountryTarget"
      />
    </Flex>
  );
}
