import { ChakraProvider } from "@chakra-ui/react";
import { useState } from "react";
import { Workflow } from "./Workflow/Workflow";
import "./index.css";
import { ReactFlowProvider } from "@xyflow/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form";

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
  const form = useForm();

  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <ReactFlowProvider>
          <FormProvider {...form}>
            <Workflow />
          </FormProvider>
        </ReactFlowProvider>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
