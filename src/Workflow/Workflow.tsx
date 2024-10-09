import {
  ReactFlow,
  Background,
  Connection,
  Controls,
  useEdgesState,
  useNodesState,
  useReactFlow,
  Node,
  Panel,
  OnReconnect,
  reconnectEdge,
  Edge,
  MarkerType,
  ReactFlowInstance,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Box, Text, Flex, IconButton, Spinner } from "@chakra-ui/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { COMPONENTS, NodeType, initialEdges, initialNodes } from "../constants";
import PaymentInit from "./PaymentInit";
import PaymentCountry from "./PaymentCountry";
import PaymentProvider from "./PaymentProvider";
import CustomEdge from "./CustomEdge";
import { v4 as uuid } from "uuid";
import { Floppy, Trash, X } from "react-bootstrap-icons";
import { useData, useUpdateData } from "../api";

const nodeTypes = {
  paymentInit: PaymentInit,
  paymentCountry: PaymentCountry,
  paymentProvider: PaymentProvider,
};

const edgeTypes = {
  customEdge: CustomEdge,
};

export const Workflow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((connection: Connection) => {
    const edge = {
      ...connection,
      animated: true,
      id: uuid(),
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 20,
        height: 20,
        color: "#FFC300",
      },
      style: {
        stroke: "blue",
        opacity: 0.3,
        fill: "yellow",
        cursor: "col-resize",
      },
      type: "straight",
      /*
      "default"
      "straight"
      "step"
      "smoothstep"
      "simplebezier"
      */
    };
    setEdges((prevEdges) => prevEdges.concat(edge));
  }, []);

  console.log({ edges, nodes });

  const dragOutsideRef = useRef<NodeType | null>(null);

  const { screenToFlowPosition, setViewport } = useReactFlow();

  const onDragStart = (
    event: React.DragEvent<HTMLButtonElement>,
    type: NodeType
  ) => {
    dragOutsideRef.current = type;
    event.dataTransfer.effectAllowed = "move";
  };

  const onDragOver: React.DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const onDrop: React.DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    const type = dragOutsideRef.current;

    if (!type) return;

    const position = screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });

    let node: Node | undefined;
    const commonNodeProps = {
      id: `${type}-${uuid()}`,
      type,
      position,
    };

    if (type === NodeType.PaymentCountry) {
      node = {
        ...commonNodeProps,
        data: { currency: "$", country: "United States", countryCode: "US" },
      };
    } else if (type === NodeType.PaymentProvider) {
      node = {
        ...commonNodeProps,
        data: { name: "Stripe", code: "St" },
      };
    } else if (type === NodeType.PaymentInit) {
      node = {
        ...commonNodeProps,
        data: { amount: 100 },
      };
    }

    if (node) setNodes((prevNodes) => [...prevNodes, node]);
  };

  const edgeReconnectSuccessful = useRef(false);

  const onReconnectStart = () => {
    edgeReconnectSuccessful.current = false;
  };

  const onReconnect: OnReconnect = (oldEdge, newConnection) => {
    edgeReconnectSuccessful.current = true;
    setEdges((prevEdges) => reconnectEdge(oldEdge, newConnection, prevEdges));
  };

  const onReconnectEnd = (_: MouseEvent | TouchEvent, edge: Edge) => {
    if (!edgeReconnectSuccessful.current) {
      setEdges((prevEdges) => prevEdges.filter((e) => e.id !== edge.id));
    }
  };

  const isValidConnection = (connection: Edge | Connection) => {
    const { source, target } = connection;
    const [sourceType] = source?.split("-") || [];
    const [targetType] = target?.split("-") || [];

    if (
      sourceType === NodeType.PaymentInit &&
      targetType === NodeType.PaymentProvider
    ) {
      return false;
    }
    if (source === target) return false;
    return true;
  };

  const { mutateAsync: saveFlow, isPending } = useUpdateData();
  const { data: reactFlowState } = useData();

  useEffect(() => {
    if (reactFlowState) {
      const { x = 0, y = 0, zoom = 1 } = reactFlowState.viewport;
      setNodes(reactFlowState.nodes || []);
      setEdges(reactFlowState.edges || []);
      setViewport({ x, y, zoom });
    }
  }, [reactFlowState]);

  const [rfInstance, setRfInstance] = useState<ReactFlowInstance<
    Node,
    Edge
  > | null>(null);

  const onSave = () => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      saveFlow(flow);
    }
  };

  return (
    <Box height={"100vh"} width="100vw" border="1px solid black">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onDragOver={onDragOver}
        onDrop={onDrop}
        proOptions={{ hideAttribution: true }}
        onReconnectStart={onReconnectStart}
        onReconnect={onReconnect}
        onReconnectEnd={onReconnectEnd}
        isValidConnection={isValidConnection}
        selectNodesOnDrag={false}
      >
        <Panel
          position="top-right"
          style={{
            border: "1px solid #ccc",
            padding: 12,
            borderRadius: 12,
            background: "white",
            width: 150,
          }}
        >
          <Flex direction={"column"} gap={2}>
            <div>
              <Text fontSize="x-small">Project</Text>
              <Flex mt={1} gap={1} flexWrap="wrap">
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
              <Flex mt={1} gap={1} flexWrap="wrap">
                {COMPONENTS.map((component) => (
                  <IconButton
                    size="sm"
                    key={component.label}
                    aria-label={component.label}
                    icon={component.icon}
                    onDragStart={(event) => onDragStart(event, component.type)}
                    draggable
                  />
                ))}
              </Flex>
            </div>
          </Flex>
        </Panel>
        <Background />
        <Controls />
      </ReactFlow>
    </Box>
  );
};
