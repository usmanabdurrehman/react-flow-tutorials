import { ChakraProvider } from "@chakra-ui/react";
import { useState } from "react";
import { Workflow } from "./Workflow/Workflow";
import "./index.css";
import { ReactFlowProvider } from "reactflow";

function App() {
  return (
    <ChakraProvider>
      <ReactFlowProvider>
        <Workflow />
      </ReactFlowProvider>
    </ChakraProvider>
  );
}

export default App;
