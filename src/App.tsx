import { ChakraProvider } from "@chakra-ui/react";
import { useState } from "react";
import { Workflow } from "./Workflow/Workflow";
import "./index.css";
import { ReactFlowProvider } from "@xyflow/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: 0,
    },
  },
});

function App() {
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <ReactFlowProvider>
          <Workflow />
        </ReactFlowProvider>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
