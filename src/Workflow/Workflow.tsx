import {
  ReactFlow,
  Background,
  BackgroundVariant,
  Controls,
  EdgeMouseHandler,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Box } from "@chakra-ui/react";
import { initialEdges, initialNodes } from "./Workflow.constants";
import CustomEdge from "./CustomEdge";
import FollowingEdge from "./FollowingEdge";
import { useCallback } from "react";
import EditableEdge from "./EditableEdge";
import EditableEdge2 from "./EditableEdge2";
import SineEdge from "./SineEdge";
import StepEdge from "./StepEdge";

const edgeTypes = {
  custom: CustomEdge,
  editable: EditableEdge,
  follow: FollowingEdge,
  editable2: EditableEdge2,
  sine: SineEdge,
  step: StepEdge,
};

export const Workflow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onEdgeMouseEnter: EdgeMouseHandler = useCallback(
    (_, edge) => {
      setEdges((prevEdges) =>
        prevEdges.map((e) =>
          e.id === edge.id ? { ...e, data: { ...e.data, isHovered: true } } : e
        )
      );
    },
    [setEdges]
  );

  const onEdgeMouseLeave: EdgeMouseHandler = useCallback(
    (_, edge) => {
      setEdges((prevEdges) =>
        prevEdges.map((e) =>
          e.id === edge.id ? { ...e, data: { ...e.data, isHovered: false } } : e
        )
      );
    },
    [setEdges]
  );

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
