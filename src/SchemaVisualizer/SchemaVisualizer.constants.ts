import { Edge, Node } from "reactflow";
import { Model } from "./SchemaVisualizer.types";
import { getInfoFromSchema } from "./SchemaVisualizer.utils";

const schema = `

model Post{
  id: number;
  title: string;
  author: User;
  comments: Comment[];
  createdAt: Date
}

model Comment{
  id: number;
  text: string;
}

model User{
  id: number;
  name: string;
  email: string;
}

`;

let row = 0;
let column = 0;

const { models, connections } = getInfoFromSchema(schema);

export const initialEdges: Edge[] = connections.map((connection) => {
  const sourceId = `${connection.source}-${connection.name}`;
  return {
    id: sourceId,
    source: connection.source,
    target: connection.target,
    targetHandle: connection.target,
    sourceHandle: sourceId,
    animated: true,
  };
});

const numModels = models.length + 1;
let numGrid = 1;
while (1) {
  if (numGrid ** 2 >= numModels) {
    break;
  }
  numGrid += 1;
}

export const initialNodes: Node<Model>[] = models.map((model, index) => {
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
    type: "model",
    data: model,
  };
});
