import { ReactFlow, Background, Controls, Node } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Box } from "@chakra-ui/react";

const generateNodes = (count: number, maxPosition: number): Node[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `node-${i}`,
    type: "default",
    position: {
      x: Math.random() * maxPosition,
      y: Math.random() * maxPosition,
    },
    data: { label: `Node ${i}` },
  }));
};

const generatedNodes = generateNodes(6000, 5000);

export const LazilyRenderNodes = () => {
  return (
    <Box height={"100vh"} width="100vw" border="1px solid black">
      <ReactFlow defaultNodes={generatedNodes} onlyRenderVisibleElements>
        <Background />
        <Controls />
      </ReactFlow>
    </Box>
  );
};
