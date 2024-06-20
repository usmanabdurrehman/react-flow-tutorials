import { ChakraProvider } from "@chakra-ui/react";
import { SchemaVisualizer } from "./SchemaVisualizer/SchemaVisualizer";
import "./index.css";

function App() {
  return (
    <ChakraProvider>
      <SchemaVisualizer />
    </ChakraProvider>
  );
}

export default App;
