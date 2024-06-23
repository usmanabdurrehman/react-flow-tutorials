import ReactFlow, { Background, BackgroundVariant, Controls } from "reactflow";
import "reactflow/dist/style.css";
import { Box } from "@chakra-ui/react";

export const SchemaVisualizer = () => {
  return (
    <Box height={"100vh"} width="100wh">
      <ReactFlow></ReactFlow>
    </Box>
  );
};
