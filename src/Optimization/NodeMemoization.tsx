import {
  ReactFlow,
  Background,
  Controls,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Box } from "@chakra-ui/react";
import { initialEdges, initialNodes } from "../constants";
import PaymentInit from "../Components/PaymentInit";
import PaymentCountry from "../Components/PaymentCountry";
import PaymentProvider from "../Components/PaymentProvider";
import ExpensiveNode from "../Components/ExpensiveNode";

const nodeTypes = {
  paymentInit: PaymentInit,
  paymentCountry: PaymentCountry,
  paymentProvider: PaymentProvider,
  expensiveNode: ExpensiveNode,
};

export const NodeMemoization = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
    <Box height={"100vh"} width="100vw" border="1px solid black">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </Box>
  );
};
