import {
  Connection,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Box } from "@chakra-ui/react";
import { COMPONENTS, initialEdges, initialNodes } from "../constants";
import { v4 as uuid } from "uuid";
import { useCallback } from "react";

export const Workflow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((connection: Connection) => {
    const edge = {
      ...connection,
      id: uuid(),
    };
    setEdges((eds) => eds.concat(edge));
  }, []);

  return (
    <Box
      height={"100vh"}
      width="100vw"
      border="1px solid black"
      position="relative"
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      ></ReactFlow>
    </Box>
  );
};
