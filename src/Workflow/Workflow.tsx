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
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Box, Flex, IconButton } from "@chakra-ui/react";
import { useCallback, useRef } from "react";
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

const nodeTypes = {
  electricalComponent: ElectricalComponent,
  battery: Battery,
};

const edgeTypes = {
  wire: Wire,
};

export const Workflow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const { getIntersectingNodes, screenToFlowPosition } = useReactFlow();
  const dragOutSideRef = useRef<string>();

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
      const newNode = {
        id: uuid(),
        type: "electricalComponent",
        position,
        data: { type: dragOutSideRef.current },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition]
  );

  const dragRef = useRef<Node | null>(null);
  const overlappedRef = useRef<Node | null>(null);

  const onNodeDragStart: OnNodeDrag = (evt, node) => {
    dragRef.current = node;
  };

  const onNodeDrag: OnNodeDrag = (evt, node) => {
    const intersectingNodes = getIntersectingNodes(node);
    setNodes((prevNodes) =>
      prevNodes.map((node) =>
        node.id === dragRef?.current?.id
          ? {
              ...node,
              data: {
                ...node?.data,
                state: intersectingNodes?.[0]
                  ? ElectricalComponentState.Add
                  : undefined,
              },
            }
          : node
      )
    );
    overlappedRef.current = intersectingNodes ? intersectingNodes[0] : null;
  };

  const onNodeDragStop: OnNodeDrag = (evt, node) => {
    dragRef.current = null;
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

  const addNode = (node: Node) => {
    setNodes((prevNodes) => [...prevNodes, node]);
  };

  const { toggleMode, isDark } = useDarkMode();

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
        connectionMode={ConnectionMode.Loose}
        colorMode={isDark ? "dark" : "light"}
      >
        <Panel position="top-right">
          <Flex direction="column" gap={1}>
            <IconButton
              icon={<Resistor />}
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
              icon={<BatteryIcon height={16} />}
              aria-label="Battery"
              size="sm"
              onClick={() =>
                setNodes((prevNodes) => [
                  ...prevNodes,
                  {
                    id: uuid(),
                    type: "battery",
                    data: {},
                    position: { x: 500, y: 500 },
                  },
                ])
              }
              onDragStart={(event) =>
                onDragStart(event, ElectricalComponentType.Inductor)
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
