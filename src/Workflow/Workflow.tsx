import {
  Background,
  BackgroundVariant,
  Connection,
  ConnectionMode,
  Controls,
  Edge,
  MarkerType,
  Node,
  OnReconnect,
  Panel,
  ReactFlow,
  reconnectEdge,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Box, Flex, IconButton, Text } from "@chakra-ui/react";
import { COMPONENTS, initialEdges, initialNodes } from "../constants";
import { v4 as uuid } from "uuid";
import { useCallback, useRef, useState } from "react";
import ElectricalComponent from "../Components/ElectricalComponent";
import Wire from "../Components/Wire";
import ConnectionLine from "../Components/ConnectionLine";
import { ElectricalComponentType } from "../types";
import Bulb from "../Components/Bulb";
import Battery from "../Components/Battery";
import ComponentDetail from "../Components/ComponentDetail";

const nodeTypes = {
  electricalComponent: ElectricalComponent,
  bulb: Bulb,
  battery: Battery,
};

const edgeTypes = {
  wire: Wire,
};

export const Workflow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((connection: Connection) => {
    const edge = {
      ...connection,
      type: "wire",
      id: uuid(),
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 20,
        height: 20,
        color: "#FFC300",
      },
    };
    setEdges((eds) => eds.concat(edge));
  }, []);

  const isValidConnection = (connection: Edge | Connection) => {
    const { source, target } = connection;

    if (source === target) return false;
    return true;
  };

  const dragOutsideRef = useRef<ElectricalComponentType | null>(null);

  const { screenToFlowPosition } = useReactFlow();

  const onDragStart = (
    event: React.DragEvent<HTMLButtonElement>,
    type: ElectricalComponentType
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
    if (
      [
        ElectricalComponentType.Capacitor,
        ElectricalComponentType.Inductor,
        ElectricalComponentType.Resistor,
      ].includes(type)
    ) {
      node = {
        id: uuid(),
        type: "electricalComponent",
        position,
        data: { type, value: 3 },
      };
    } else if (type === ElectricalComponentType.Bulb) {
      node = {
        id: uuid(),
        type,
        position,
        data: { value: 12 },
      };
    } else if (type === ElectricalComponentType.Battery) {
      node = {
        id: uuid(),
        type,
        position,
        data: { value: 12 },
      };
    }

    if (node) setNodes((prevNodes) => prevNodes.concat(node));
  };

  const [selectedNode, setSelectedNode] = useState<Node | undefined>();

  const onNodeClick = (event: React.MouseEvent<Element>, node: Node) => {
    setSelectedNode(node);
  };

  const onPaneClick = () => {
    setSelectedNode(undefined);
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
      setEdges((prevEdges) =>
        prevEdges.filter((prevEdge) => prevEdge.id !== edge.id)
      );
    }
  };

  return (
    <Box
      height={"100vh"}
      width="100vw"
      border="1px solid black"
      position="relative"
    >
      {selectedNode && (
        <Flex
          position={"absolute"}
          top={0}
          left={0}
          height="100%"
          width="150px"
          alignItems={"center"}
          bg="transparent"
          marginLeft="12px"
        >
          <Box
            bg="white"
            border="1px solid #ccc"
            borderRadius="12px"
            height="150px"
            width="100%"
            padding="12px"
            marginBottom="50px"
            position={"relative"}
            zIndex={1000}
          >
            <ComponentDetail node={selectedNode} key={selectedNode.id} />
          </Box>
        </Flex>
      )}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        connectionMode={ConnectionMode.Loose}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        connectionLineComponent={ConnectionLine}
        isValidConnection={isValidConnection}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        onReconnectStart={onReconnectStart}
        onReconnect={onReconnect}
        onReconnectEnd={onReconnectEnd}
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
        <Background
          variant={BackgroundVariant.Lines}
          gap={10}
          color="#f1f1f1"
          id="1"
        />
        <Background
          variant={BackgroundVariant.Lines}
          gap={100}
          color="#ccc"
          id="2"
        />
        <Controls />
        <svg>
          <defs>
            <linearGradient id="wire">
              <stop offset="0%" stopColor="#ecff02" />
              <stop offset="100%" stopColor="#f69900" />
            </linearGradient>
          </defs>
        </svg>
      </ReactFlow>
    </Box>
  );
};
