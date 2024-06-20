import { Edge, Node } from "reactflow";
import { v4 as uuid } from "uuid";
import { Model } from "./SchemaVisualizer.types";
import { getModelFromSchema } from "./SchemaVisualizer.utils";

const schema2 = `
model Country{
  id: number;
  name: string;
  currency: Currency;
  animal: Animal
  capital: City;
}

model Currency{
  id: number;
  symbol: string
}

model Animal{
  id: number;
  name: string;
}

model City{
  id: number;
  name: string;
}

`;

const schema = `

model Post{
  id: number;
  title: string;
  author: User;
  comments: Comment[];
  createdAt: Date
}

model User{
  id: number;
  name: string;
  email: string;
}

model Comment{
  id: number;
  text: string;
}

`;

export const initialEdges: Edge[] = [
  {
    id: "Post-comments",
    source: "Post",
    target: "Comment",
    targetHandle: "Comment",
    sourceHandle: "Post-comments",
    animated: true,
  },
  {
    id: "Post-author",
    source: "Post",
    target: "User",
    targetHandle: "User",
    sourceHandle: "Post-author",
    animated: true,
  },
];

let row = 0;
let column = 0;
export const initialNodes: Node<Model>[] = getModelFromSchema(schema2).map(
  (model, index) => {
    if (!index) {
    } else if (index % 2 !== 0) {
      row += 1;
    } else {
      column += 1;
    }

    const x = row * 300;
    const y = column * 300;

    console.log({ row, column, x, y });

    return {
      id: model.name,
      position: { x, y },
      type: "model",
      data: model,
    };
  }
);
