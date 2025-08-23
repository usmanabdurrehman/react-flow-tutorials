import {
  ReactFlow,
  Background,
  Connection,
  Controls,
  Panel,
  useEdgesState,
  useNodesState,
  useReactFlow,
  BackgroundVariant,
  Node,
  OnNodeDrag,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Box, Flex, IconButton, Text } from "@chakra-ui/react";
import { useCallback, useRef } from "react";
import { v4 as uuid } from "uuid";
import { COMPONENTS, initialEdges, initialNodes } from "../constants";
import { InfoNode as InfoNodeType, NodeType } from "../types";
import NameNode from "../Components/NameNode";
import InfoNode from "../Components/InfoNode";
import { AppNode } from "../types";
import UtilityNode from "../Components/UtilityNode";
import { HandleNode } from "../Components/HandleNode";

const nodeTypes = {
  [NodeType.Name]: NameNode,
  [NodeType.Info]: InfoNode,
  [NodeType.Handle]: HandleNode,
  [NodeType.Utility]: UtilityNode,
};

export const Workflow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const { screenToFlowPosition } = useReactFlow();
  const dragOutSideRef = useRef<string>();

  const onDragStart = (
    event: React.DragEvent<HTMLButtonElement>,
    type: NodeType
  ) => {
    dragOutSideRef.current = type;
    event.dataTransfer.effectAllowed = "move";
  };

  const onDragOver: React.DragEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
    },
    []
  );

  const onDrop: React.DragEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      event.preventDefault();
      const type = dragOutSideRef.current;

      if (!type) {
        return;
      }

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: uuid(),
        type,
        position,
        data: {},
      } as AppNode;

      setNodes((prevNodes) => [...prevNodes, newNode]);
    },
    [screenToFlowPosition, setNodes]
  );

  const onConnect = useCallback(
    (connection: Connection) => {
      const edge = {
        ...connection,
        id: uuid(),
      };
      setEdges((prevEdges) => [...prevEdges, edge]);
    },
    [setEdges]
  );

  const onNodeDrag: OnNodeDrag = useCallback((_, node) => {}, []);

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
        nodeTypes={nodeTypes}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onNodeDrag={onNodeDrag}
        fitView
      >
        <Panel
          position="top-right"
          style={{
            border: "1px solid #ccc",
            padding: 12,
            borderRadius: "12px",
            background: "white",
            width: 150,
          }}
        >
          <Flex direction="column" gap={3}>
            <div>
              <Text fontSize="x-small">Components</Text>
              <Flex gap={1} mt={1} flexWrap="wrap">
                {COMPONENTS.map((component) => (
                  <IconButton
                    key={component.type}
                    icon={component.icon}
                    aria-label={component.label}
                    size="sm"
                    onDragStart={(event) => onDragStart(event, component.type)}
                    draggable
                  />
                ))}
              </Flex>
            </div>
          </Flex>
        </Panel>
        <Background id="1" color="#f1f1f1" variant={BackgroundVariant.Lines} />
        <Controls />
      </ReactFlow>
    </Box>
  );
};
