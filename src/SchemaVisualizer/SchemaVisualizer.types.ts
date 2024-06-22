export type Model = {
  name: string;
  fields: {
    name: string;
    type: string;
    hasConnections?: boolean;
  }[];
  isChild?: boolean;
};

export type ModelConnection = {
  target: string;
  source: string;
  name: string;
};
