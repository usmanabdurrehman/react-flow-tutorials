import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  Edge,
  Node,
} from "reactflow";
import "reactflow/dist/style.css";
import { Box } from "@chakra-ui/react";
import { getInfoFromSchema } from "./SchemaVisualzer.utils";
import { schema } from "./SchemaVisualizer.constants";
import ModelNode from "./ModelNode";

const modelTypes = {
  model: ModelNode,
};

const { models, connections } = getInfoFromSchema(schema);

let row = 0;
let column = 0;
const numModels = models.length;
let numGrid = 1;

while (1) {
  if (numGrid ** 2 >= numModels) {
    break;
  }
  numGrid++;
}

const nodes: Node[] = models.map((model, index) => {
  const x = row * 300;
  const y = column * 300;

  if (numGrid % index === 0) {
    column = 0;
    row += 1;
  } else {
    column += 1;
  }

  return {
    id: model.name,
    position: { x, y },
    data: model,
    type: "model",
  };
});

const edges: Edge[] = connections.map((connection) => {
  const sourceId = `${connection.source}-${connection.name}`;
  return {
    id: sourceId,
    source: connection.source,
    target: connection.target,
    sourceHandle: sourceId,
    targetHandle: connection.target,
    animated: true,
  };
});

export const SchemaVisualizer = () => {
  return (
    <Box height={"100vh"} width="100wh" bg="#1C1c1c">
      <ReactFlow
        defaultNodes={nodes}
        defaultEdges={edges}
        nodeTypes={modelTypes}
        fitView
        fitViewOptions={{ padding: 0.4 }}
      >
        <Background color="#222" variant={BackgroundVariant.Lines} />
        <Controls />
      </ReactFlow>
    </Box>
  );
};
