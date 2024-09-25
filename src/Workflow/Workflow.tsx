import {
  ReactFlow,
  Background,
  Connection,
  ConnectionMode,
  Controls,
  Edge,
  Node,
  Panel,
  useEdgesState,
  useNodesState,
  useReactFlow,
  OnNodeDrag,
  ReactFlowInstance,
  ReactFlowJsonObject,
  useStore,
  ReactFlowState,
  reconnectEdge,
  OnReconnect,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Box, Button, Flex, IconButton } from "@chakra-ui/react";
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
import { isPointInBox, zoomSelector } from "../utils";
import useKeyBindings from "../hooks/useKeyBindings";

const nodeTypes = {
  electricalComponent: ElectricalComponent,
  battery: Battery,
  board: Board,
};

const edgeTypes = {
  wire: Wire,
};

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

      let position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const boards = nodes?.filter(
        (node) => node.type === ElectricalComponentType.Board
      );
      let boardId: string | undefined;
      boards.forEach((board) => {
        const {
          position: { x, y },
          measured: { height = 0, width = 0 } = {},
        } = board;

        if (
          isPointInBox(
            {
              x: position.x,
              y: position.y,
            },
            {
              x: x,
              y: y,
              width: width,
              height: height,
            }
          )
        ) {
          boardId = board.id;
        }
      });

      const type = dragOutSideRef.current;

      if (boardId) {
        const board = nodes?.find((node) => node.id === boardId);
        const { x, y } = board?.position || { x: 0, y: 0 };
        const { x: dragX, y: dragY } = position || {
          x: 0,
          y: 0,
        };
        position = { x: dragX - x, y: dragY - y };
      }

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
          parentId: boardId,
        };
      } else if (type === ElectricalComponentType.Battery) {
        newNode = {
          id: uuid(),
          type: "battery",
          position,
          data: {},
          parentId: boardId,
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
    [screenToFlowPosition, nodes]
  );

  const dragRef = useRef<Node | null>(null);
  const overlappedRef = useRef<Node | null>(null);

  const showContent = useStore(zoomSelector);

  const onNodeDragStart: OnNodeDrag = (evt, node) => {
    dragRef.current = node;
  };

  const onNodeDrag: OnNodeDrag = (evt, node) => {
    const intersectingNode = getIntersectingNodes(node)?.[0];

    setNodes((prevNodes) =>
      prevNodes.map((node) => {
        if (node.id === dragRef?.current?.id)
          return {
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
          };

        return node;
      })
    );
    overlappedRef.current = intersectingNode;
  };

  const onNodeDragStop: OnNodeDrag = (evt, node) => {
    console.log({ evt, node });
    if (
      (!overlappedRef.current ||
        overlappedRef.current?.type !== ElectricalComponentType.Board) &&
      node.parentId
    ) {
      setNodes((prevNodes) => {
        const board = prevNodes?.find(
          (prevNode) => prevNode?.id === node.parentId
        );

        return prevNodes.map((prevNode) => {
          if (prevNode.id === node.id) {
            const { x, y } = board?.position || { x: 0, y: 0 };
            const { x: dragX, y: dragY } = node?.position || {
              x: 0,
              y: 0,
            };
            const position = { x: dragX + x, y: dragY + y };
            return { ...prevNode, position, parentId: undefined };
          }
          return prevNode;
        });
      });
    }

    if (
      [
        ElectricalComponentType.Resistor,
        ElectricalComponentType.Capacitor,
        ElectricalComponentType.Inductor,
      ].includes(node?.data?.type as ElectricalComponentType) &&
      overlappedRef.current?.data?.type === node?.data?.type
    ) {
      // console.log({ overlappedRef, node });
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
              data: {
                ...node?.data,
                visible: showContent,
              },
              draggable: showContent,
              selectable: showContent,
              isConnectable: showContent,
              // extent: "parent",
            };
          }
          return node;
        })
      );
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

  // console.log({ nodes });

  useEffect(() => {
    setNodes((prevNodes) =>
      prevNodes.map((node) => {
        if (node.parentId) {
          return {
            ...node,
            data: {
              ...node.data,
              visible: showContent,
              connectable: showContent,
            },
            draggable: showContent,
            selectable: showContent,
          };
        }
        return {
          ...node,
          data: {
            ...node.data,
            visible: true,
            connectable: true,
          },
          draggable: true,
          selectable: true,
        };
      })
    );
  }, [showContent]);

  const edgeReconnectSuccessful = useRef(true);

  const onReconnectStart = useCallback(() => {
    edgeReconnectSuccessful.current = false;
  }, []);

  const onReconnect: OnReconnect = useCallback((oldEdge, newConnection) => {
    edgeReconnectSuccessful.current = true;
    setEdges((els) => reconnectEdge(oldEdge, newConnection, els));
  }, []);

  const onReconnectEnd = useCallback(
    (_: MouseEvent | TouchEvent, edge: Edge) => {
      if (!edgeReconnectSuccessful.current) {
        setEdges((eds) => eds.filter((e) => e.id !== edge.id));
      }

      edgeReconnectSuccessful.current = true;
    },
    []
  );

  const onKeyDown = useKeyBindings();

  return (
    <Box height={"100vh"} width="100vw" border="1px solid black">
      <ReactFlow
        onKeyDown={onKeyDown}
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
        onReconnect={onReconnect}
        onReconnectStart={onReconnectStart}
        onReconnectEnd={onReconnectEnd}
        // snapToGrid
        // translateExtent={[
        //   [0, 0],
        //   [1000, 1000],
        // ]}
        connectionLineComponent={ConnectionLine}
      >
        <Panel position="top-right">
          <Flex direction="column" gap={1}>
            <DownloadButton />
            <Button onClick={onSave} size="sm">
              Save
            </Button>
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
        <svg>
          <defs>
            <linearGradient id="edge-gradient">
              <stop offset="0%" stopColor="#ecff02" />
              <stop offset="100%" stopColor="#f69900" />
            </linearGradient>
          </defs>
        </svg>
      </ReactFlow>
    </Box>
  );
};
