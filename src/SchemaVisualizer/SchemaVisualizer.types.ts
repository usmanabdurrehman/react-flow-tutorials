export type Model = {
  name: string;
  fields: {
    name: string;
    type: string;
    hasConnections?: boolean;
    id: string;
  }[];
  isChild?: boolean;
};
