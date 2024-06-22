import { v4 as uuid } from "uuid";
import { Model, ModelConnection } from "./SchemaVisualizer.types";

export const getInfoFromSchema = (
  schema: string
): { models: Model[]; connections: ModelConnection[] } => {
  const modelStrings = Array.from(
    schema.matchAll(/model \w+{[\s\b\w:;\[\]]+}/g)
  ).map((item) => item[0]);

  const modelNames = modelStrings.map(
    (model) => Array.from(model.matchAll(/model (\w+){/g))?.[0]?.[1]
  );

  const parsedModels = modelStrings.map((model) => ({
    name: Array.from(model.matchAll(/model (\w+){/g))?.[0]?.[1],
    fields: Array.from(model.matchAll(/(\w+): (\w+)/g)).map((item) => ({
      name: item?.[1],
      type: item?.[2],
      hasConnections: modelNames?.some((name) => item?.[2]?.includes(name)),
      id: uuid(),
    })),
  }));

  const connections: ModelConnection[] = [];

  parsedModels.forEach((model) => {
    model.fields.forEach((field) => {
      const connection = modelNames?.find((name) =>
        field?.type?.includes(name)
      );
      if (connection)
        connections.push({
          target: connection,
          source: model.name,
          name: field.name,
        });
    });
  });

  return {
    connections,
    models: parsedModels.map((model) => ({
      ...model,
      isChild: parsedModels.some((parsedModel) =>
        parsedModel.fields.find((field) => field.type?.includes(model.name))
      ),
    })),
  };
};
