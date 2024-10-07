import { Box, position } from "@chakra-ui/react";
import React, { CSSProperties } from "react";
import { useDarkMode } from "../store";

const props = {
  background: "#eee",
  position: "relative",
  width: "100%",
  flex: 1,
} satisfies CSSProperties;

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
      gap={2}
      borderRadius="8px"
      height="100%"
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
