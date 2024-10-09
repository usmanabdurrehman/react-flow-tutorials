import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useData = () =>
  useQuery({
    queryKey: ["GET_DATA"],
    queryFn: async () => {
      const { data } = await axios.get("http://localhost:7000/data");
      return data;
    },
  });
