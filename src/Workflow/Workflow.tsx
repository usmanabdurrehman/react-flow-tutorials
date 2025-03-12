import {
  ReactFlow,
  Background,
  Connection,
  Controls,
  Edge,
  Node,
  Panel,
  useEdgesState,
  useNodesState,
  useReactFlow,
  ReactFlowInstance,
  MarkerType,
  BackgroundVariant,
  addEdge,
  ReactFlowJsonObject,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Box, Flex, IconButton, Spinner, Text } from "@chakra-ui/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import { COMPONENTS, initialEdges, initialNodes } from "../constants";
import { Floppy } from "react-bootstrap-icons";
import { useData, useUpdateData } from "../api";
import { NodeType } from "../constants";
import Order from "../Components/Order";
import PaymentGateway from "../Components/PaymentGateway";
import { useForm } from "react-hook-form";

const nodeTypes = {
  [NodeType.Order]: Order,
  [NodeType.PaymentGateway]: PaymentGateway,
};

export const Workflow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [rfInstance, setRfInstance] = useState<ReactFlowInstance<
    Node,
    Edge
  > | null>(null);

  const { mutateAsync: saveFlowState, isPending } = useUpdateData();
  const { data: reactFlowState } = useData();

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

  console.log("workflow rerendering");

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
      };

      setNodes((prevNodes) => [...prevNodes, newNode]);
    },
    [screenToFlowPosition, setNodes]
  );

  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      saveFlowState(flow);
    }
  }, [rfInstance, saveFlowState]);

  const restoreFlow = useCallback(
    (flow: ReactFlowJsonObject<Node, Edge>) => {
      if (flow) {
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
      }
    },
    [setEdges, setNodes]
  );

  useEffect(() => {
    restoreFlow(reactFlowState);
  }, [reactFlowState, restoreFlow]);

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
        onInit={setRfInstance}
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
              <Text fontSize="x-small">Project</Text>
              <Flex gap={1} mt={1} flexWrap="wrap">
                <IconButton
                  icon={isPending ? <Spinner size="xs" /> : <Floppy />}
                  aria-label="Save"
                  size="xs"
                  onClick={onSave}
                />
              </Flex>
            </div>
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
