import { useMutation, useQuery } from "@tanstack/react-query";
import { Edge, Node, ReactFlowJsonObject } from "@xyflow/react";
import axios from "axios";

export const useUpdateData = () =>
  useMutation({
    mutationFn: async (reactFlowData: ReactFlowJsonObject<Node, Edge>) => {
      const { data } = await axios.post("http://localhost:7000/data", {
        data: reactFlowData,
      });
      return data;
    },
  });
