import { Box, ResponsiveValue, position } from "@chakra-ui/react";
import React from "react";
import { useDarkMode } from "../store";

const props = {
  bg: "#eee",
  height: 5,
  position: "relative" as any,
  width: "100%",
  flex: 1,
};

export default function Placeholder() {
  const { isDark } = useDarkMode();
  let color = "white";
  if (isDark) color = "#141414";

  return (
    <Box
      p={3}
      pos="relative"
      zIndex={1}
      bg={color}
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
