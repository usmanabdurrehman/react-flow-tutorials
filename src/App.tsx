import { ChakraProvider } from "@chakra-ui/react";
import { Memoization } from "./Optimization/Memoization";
import "./index.css";
import { ReactFlowProvider } from "@xyflow/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NodeMemoization } from "./Optimization/NodeMemoization";
import { LazilyRenderNodes } from "./Optimization/LazilyRenderNodes";
import { SnapNodes } from "./Optimization/SnapNodes";
import { CollapseNodes } from "./Optimization/CollapseNodes";

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
          {/* <Memoization /> */}
          {/* <NodeMemoization /> */}
          {/* <LazilyRenderNodes /> */}
          {/* <SnapNodes /> */}
          <CollapseNodes />
        </ReactFlowProvider>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

// if (targetNode.data?.children) {
//   setNodes((prevNodes) =>
//     prevNodes.map((node) =>
//       (targetNode?.data?.children as string[])?.includes(node.id)
//         ? { ...node, hidden: !node.hidden }
//         : node
//     )
//   );
// }

export default App;
