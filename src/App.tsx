import { ChakraProvider } from "@chakra-ui/react";
import { useState } from "react";
import { Workflow } from "./Workflow/Workflow";

function App() {
  const [count, setCount] = useState(0);

  return (
    <ChakraProvider>
      <Workflow />
    </ChakraProvider>
  );
}

export default App;
