import { Model, ModelConnection } from "./SchemaVisualizer.types";

const MODEL_PATTERN = /model \w+{[\s\b\w:;\[\]]+}/g;
const MODEL_NAME_PATTERN = /model (\w+){/g;
const MODEL_FIELDS_PATTERN = /(\w+): (\w+)/g;

export const getInfoFromSchema = (
  schema: string
): { models: Model[]; connections: ModelConnection[] } => {
  const modelStrings = Array.from(schema.matchAll(MODEL_PATTERN)).map(
    (item) => item[0]
  );

  const modelNames = modelStrings.map(
    (model) => Array.from(model.matchAll(MODEL_NAME_PATTERN))?.[0]?.[1]
  );

  const parsedModels = modelStrings.map((model, index) => {
    return {
      name: modelNames[index],
      fields: Array.from(model.matchAll(MODEL_FIELDS_PATTERN)).map((item) => {
        const name = item?.[1];
        const type = item?.[2];
        return {
          name,
          type,
          hasConnections: modelNames?.some((name) => type?.includes(name)),
        };
      }),
    };
  });

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
