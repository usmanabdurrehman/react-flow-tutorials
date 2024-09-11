import { ChakraProvider } from "@chakra-ui/react";
import { useState } from "react";
import { Workflow } from "./Workflow/Workflow";
import "./index.css";
import { ReactFlowProvider } from "@xyflow/react";

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
