import {
  ReactFlow,
  Background,
  BackgroundVariant,
  Controls,
  useEdgesState,
  useNodesState,
  EdgeMouseHandler,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Box } from "@chakra-ui/react";
import { initialEdges, initialNodes } from "./Workflow.constants";
import { useCallback } from "react";
import CustomEdge from "./CustomEdge";
import StepEdge from "./StepEdge";
import SineEdge from "./SineEdge";
import EditableEdge from "./EditableEdge";
import EditableEdge2 from "./EditableEdge2";
import FollowingEdge from "./FollowingEdge";

const edgeTypes = {
  custom: CustomEdge,
  step: StepEdge,
  sine: SineEdge,
  editable: EditableEdge,
  editable2: EditableEdge2,
  following: FollowingEdge,
};

export const Workflow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onEdgeMouseEnter: EdgeMouseHandler = (_, edge) => {
    setEdges((prevEdges) =>
      prevEdges.map((e) =>
        e.id === edge.id
          ? { ...edge, data: { ...edge.data, isHovered: true } }
          : e
      )
    );
  };

  const onEdgeMouseLeave: EdgeMouseHandler = (_, edge) => {
    setEdges((prevEdges) =>
      prevEdges.map((e) =>
        e.id === edge.id
          ? { ...edge, data: { ...edge.data, isHovered: false } }
          : e
      )
    );
  };

  return (
    <Box height={"100vh"} width="100wh">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgeMouseEnter={onEdgeMouseEnter}
        onEdgeMouseLeave={onEdgeMouseLeave}
        onEdgesChange={onEdgesChange}
        edgeTypes={edgeTypes}
        fitView
      >
        <Background variant={BackgroundVariant.Lines} />
        <Controls />
      </ReactFlow>
    </Box>
  );
};
