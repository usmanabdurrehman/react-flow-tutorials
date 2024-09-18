import {
  ReactFlow,
  addEdge,
  Background,
  Connection,
  ConnectionMode,
  Controls,
  Edge,
  MiniMap,
  Node,
  NodeProps,
  Panel,
  useEdgesState,
  useNodesState,
  useReactFlow,
  OnNodeDrag,
  ReactFlowInstance,
  ReactFlowJsonObject,
  useStore,
  ReactFlowState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Box, Flex, IconButton } from "@chakra-ui/react";
import { useCallback, useEffect, useRef, useState } from "react";
import Wire from "../Components/Wire";
import { v4 as uuid } from "uuid";
import { initialEdges, initialNodes } from "./Workflow.constants";
import ElectricalComponent from "../Components/ElectricalComponent";
import { Capacitor, Inductor, Resistor } from "../icons";
import { ElectricalComponentState, ElectricalComponentType } from "../types";
import { Moon, Sun } from "react-bootstrap-icons";
import { useDarkMode } from "../store";
import Battery from "../Components/Battery";
import { Battery as BatteryIcon } from "../icons";
import DownloadButton from "../Components/DownloadBtn";
import { useData, useUpdateData } from "../api";
import ConnectionLine from "../Components/ConnectionLine";
import Board from "../Components/Board";

const nodeTypes = {
  electricalComponent: ElectricalComponent,
  battery: Battery,
  board: Board,
};

const edgeTypes = {
  wire: Wire,
};

const zoomSelector = (s: ReactFlowState) => s.transform[2] >= 0.9;

export const Workflow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [rfInstance, setRfInstance] = useState<ReactFlowInstance<
    Node,
    Edge
  > | null>(null);

  const { mutateAsync: saveFlowState } = useUpdateData();
  const { data: reactFlowState } = useData();

  const { getIntersectingNodes, screenToFlowPosition } = useReactFlow();
  const dragOutSideRef = useRef<string>();
  const { setViewport } = useReactFlow();

  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      saveFlowState(flow);
    }
  }, [rfInstance]);

  const restoreFlow = (flow: ReactFlowJsonObject<Node, Edge>) => {
    if (flow) {
      const { x = 0, y = 0, zoom = 1 } = flow.viewport;
      setNodes(flow.nodes || []);
      setEdges(flow.edges || []);
      setViewport({ x, y, zoom });
    }
  };

  useEffect(() => {
    restoreFlow(reactFlowState);
  }, [reactFlowState]);

  const onDragStart = (
    event: React.DragEvent<HTMLButtonElement>,
    type: ElectricalComponentType
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

      // check if the dropped element is valid
      if (!dragOutSideRef.current) {
        return;
      }

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const type = dragOutSideRef.current;
      let newNode: Node | undefined;
      if (
        [
          ElectricalComponentType.Capacitor,
          ElectricalComponentType.Resistor,
          ElectricalComponentType.Inductor,
        ].includes(type as ElectricalComponentType)
      ) {
        newNode = {
          id: uuid(),
          type: "electricalComponent",
          position,
          data: { type, value: 3, unit: "kΩ" },
        };
      } else if (type === ElectricalComponentType.Battery) {
        newNode = {
          id: uuid(),
          type: "battery",
          position,
          data: {},
        };
      } else if (type === ElectricalComponentType.Board) {
        newNode = {
          id: uuid(),
          type: ElectricalComponentType.Board,
          position,
          data: {},
          style: { width: 200, height: 200 },
        };
      }

      if (newNode) setNodes((nds) => nds.concat(newNode as Node));
    },
    [screenToFlowPosition]
  );

  const dragRef = useRef<Node | null>(null);
  const overlappedRef = useRef<Node | null>(null);

  const onNodeDragStart: OnNodeDrag = (evt, node) => {
    dragRef.current = node;
  };

  const onNodeDrag: OnNodeDrag = (evt, node) => {
    const intersectingNode = getIntersectingNodes(node)?.[0];
    setNodes((prevNodes) =>
      prevNodes.map((node) =>
        node.id === dragRef?.current?.id
          ? {
              ...node,
              data: {
                ...node?.data,
                state:
                  intersectingNode &&
                  [
                    ElectricalComponentType.Resistor,
                    ElectricalComponentType.Capacitor,
                    ElectricalComponentType.Inductor,
                  ].includes(
                    intersectingNode?.data?.type as ElectricalComponentType
                  )
                    ? intersectingNode?.data?.type === node?.data?.type
                      ? ElectricalComponentState.Add
                      : ElectricalComponentState.NotAdd
                    : undefined,
              },
            }
          : node
      )
    );
    overlappedRef.current = intersectingNode;
  };

  const onNodeDragStop: OnNodeDrag = (evt, node) => {
    if (dragRef.current && overlappedRef.current) {
      if (overlappedRef.current?.data?.type === node?.data?.type) {
        setNodes((prevNodes) => {
          const nodes = prevNodes
            .map((node) =>
              node.id === overlappedRef.current?.id
                ? {
                    ...node,
                    data: {
                      ...node?.data,
                      value:
                        (node?.data?.value as number) +
                        (dragRef.current?.data?.value as number),
                    },
                  }
                : node
            )
            .filter((node) => node.id !== dragRef?.current?.id);
          return nodes;
        });
      }
      if (overlappedRef?.current?.type === ElectricalComponentType.Board) {
        setNodes((prevNodes) =>
          prevNodes.map((node) => {
            const { x, y } = overlappedRef?.current?.position || { x: 0, y: 0 };
            const { x: dragX, y: dragY } = node?.position || {
              x: 0,
              y: 0,
            };
            const position = { x: dragX - x, y: dragY - y };

            if (node?.id === dragRef?.current?.id) {
              return {
                ...node,
                ...(!node?.parentId && { position }),
                parentId: overlappedRef.current?.id,
                extent: "parent",
              };
            }
            return node;
          })
        );
      }
    }
  };

  const onConnect = useCallback(
    (connection: Connection) => {
      const edge = {
        ...connection,
        id: uuid(),
        type: "wire",
      };
      setEdges((prevEdges) => [...prevEdges, edge]);
    },
    [edges]
  );

  const { toggleMode, isDark } = useDarkMode();

  const isValidConnection = (connection: Edge | Connection) => {
    const { source, target } = connection;

    if (source === target) return false;
    return true;
  };

  const showContent = useStore(zoomSelector);

  console.log({ nodes });

  useEffect(() => {
    setNodes((prevNodes) =>
      prevNodes.map((node) => {
        if (node.parentId) {
          return { ...node, data: { ...node.data, visible: showContent } };
        }
        return { ...node, data: { ...node.data, visible: true } };
      })
    );
  }, [showContent]);

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
        onNodeDragStart={onNodeDragStart}
        onNodeDrag={onNodeDrag}
        onNodeDragStop={onNodeDragStop}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setRfInstance}
        isValidConnection={isValidConnection}
        connectionMode={ConnectionMode.Loose}
        colorMode={isDark ? "dark" : "light"}
        // translateExtent={[
        //   [0, 0],
        //   [1000, 1000],
        // ]}
        connectionLineComponent={ConnectionLine}
      >
        <Panel position="top-right">
          <Flex direction="column" gap={1}>
            <DownloadButton />
            <button onClick={onSave}>Save</button>
            <IconButton
              icon={<Resistor height={16} />}
              aria-label="Resistor"
              size="sm"
              onDragStart={(event) =>
                onDragStart(event, ElectricalComponentType.Resistor)
              }
              draggable
            />
            <IconButton
              icon={<Capacitor height={16} />}
              aria-label="Capacitor"
              size="sm"
              onDragStart={(event) =>
                onDragStart(event, ElectricalComponentType.Capacitor)
              }
              draggable
            />
            <IconButton
              icon={<Inductor height={12} />}
              aria-label="Inductor"
              size="sm"
              onDragStart={(event) =>
                onDragStart(event, ElectricalComponentType.Inductor)
              }
              draggable
            />
            <IconButton
              icon={<BatteryIcon height={32} />}
              aria-label="Battery"
              size="sm"
              onDragStart={(event) =>
                onDragStart(event, ElectricalComponentType.Battery)
              }
              draggable
            />
            <IconButton
              icon={
                <Box
                  height="20px"
                  width="20px"
                  borderRadius="8px"
                  border="2px solid black"
                ></Box>
              }
              aria-label="Board"
              size="sm"
              onDragStart={(event) =>
                onDragStart(event, ElectricalComponentType.Board)
              }
              draggable
            />
          </Flex>
        </Panel>
        <Panel position="top-left">
          <IconButton
            icon={isDark ? <Sun /> : <Moon />}
            aria-label="Light/Dark Mode"
            size="xs"
            colorScheme={isDark ? "orange" : "blackAlpha"}
            onClick={toggleMode}
          />
        </Panel>
        <Background />
        <Controls />
      </ReactFlow>
    </Box>
  );
};
