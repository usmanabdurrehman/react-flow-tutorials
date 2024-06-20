import ReactFlow, { Background, BackgroundVariant, Controls } from "reactflow";
import "reactflow/dist/style.css";
import { Box } from "@chakra-ui/react";
import { initialEdges, initialNodes } from "./SchemaVisualizer.constants";
import ModelNode from "./ModelNode";
const nodeTypes = {
  model: ModelNode,
};

export const SchemaVisualizer = () => {
  return (
    <Box height={"100vh"} width="100wh" bg="#1C1C1C" pos="relative">
      <ReactFlow
        defaultNodes={initialNodes}
        defaultEdges={initialEdges}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background color="#222" variant={BackgroundVariant.Lines} />
        <Controls />
      </ReactFlow>
    </Box>
  );
};
