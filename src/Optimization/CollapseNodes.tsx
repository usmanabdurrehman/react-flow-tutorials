import {
  ReactFlow,
  Background,
  Controls,
  useEdgesState,
  useNodesState,
  Edge,
  Node,
  NodeMouseHandler,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Box } from "@chakra-ui/react";

const nodeTypes = {};

const initialNodes: Node[] = [
  {
    id: "1",
    position: {
      x: 208,
      y: 54,
    },
    data: {
      children: ["2", "3", "4"],
      label: "Node 1",
    },
  },
  {
    id: "2",
    position: {
      x: 63,
      y: 303,
    },
    data: {
      label: "Node 2",
    },
  },
  {
    id: "3",
    position: {
      x: 410,
      y: 305,
    },
    data: {
      label: "Node 3",
    },
  },
  {
    id: "4",
    position: {
      x: 242,
      y: 306,
    },
    data: {
      label: "Node 4",
    },
  },
];

const initialEdges: Edge[] = [
  { id: "1-2", source: "1", target: "2" },
  { id: "1-3", source: "1", target: "3" },
  { id: "1-4", source: "1", target: "4" },
];

export const CollapseNodes = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onNodeClick: NodeMouseHandler<Node> = (event, targetNode) => {
    if (targetNode?.data?.children) {
      setNodes((prevNodes) =>
        prevNodes.map((node) =>
          (targetNode?.data?.children as string[])?.includes(node.id)
            ? { ...node, hidden: !node.hidden }
            : node
        )
      );
    }
  };

  return (
    <Box height={"100vh"} width="100vw" border="1px solid black">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        onNodeClick={onNodeClick}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </Box>
  );
};
