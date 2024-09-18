import { Box, ResponsiveValue, position } from "@chakra-ui/react";
import React from "react";

const props = {
  bg: "#eee",
  height: 5,
  position: "relative" as any,
  width: "100%",
  flex: 1,
};

export default function Placeholder() {
  return (
    <Box
      p={3}
      pos="relative"
      zIndex={1}
      bg="white"
      display="flex"
      flexDirection={"column"}
      height="100%"
      borderRadius="8px"
      gap={2}
    >
      <Box {...props} />
      <Box {...props} />
      <Box {...props} />
      <Box {...props} />
      <Box {...props} />
      <Box {...props} />
    </Box>
  );
}
