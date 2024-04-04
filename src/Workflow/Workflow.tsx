import ReactFlow, {
  Controls,
  Background,
  MiniMap,
  useNodesState,
  useEdgesState,
  NodeTypes,
  EdgeTypes,
  addEdge,
  Connection,
} from "reactflow";
import "reactflow/dist/style.css";
import { Box } from "@chakra-ui/react";
import CustomEdge from "./CustomEdge";
import { useCallback } from "react";
import { initialEdges, initialNodes } from "./Workflow.constants";
import PaymentInit from "./PaymentInit";
import PaymentCountry from "./PaymentCountry";
import PaymentProvider from "./PaymentProvider";
import PaymentProviderSelect from "./PaymentProviderSelect";

const nodeTypes: NodeTypes = {
  paymentInit: PaymentInit,
  paymentCountry: PaymentCountry,
  paymentProvider: PaymentProvider,
  paymentProviderSelect: PaymentProviderSelect,
};

const edgeTypes: EdgeTypes = {
  customEdge: CustomEdge,
};

export const Workflow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (connection: Connection) => {
      const edge = {
        ...connection,
        type: "customEdge",
        animated: true,
        id: `${edges.length + 1}`,
      };
      setEdges((eds) => addEdge(edge, eds));
    },
    [setEdges, edges]
  );

  return (
    <Box height={"500px"} width="500px" border="1px solid black">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onConnect={onConnect}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </Box>
  );
};
