import {
  ReactFlow,
  Background,
  Controls,
  useEdgesState,
  useNodesState,
  useReactFlow,
  Node,
  Panel,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Box, Text, Flex, IconButton } from "@chakra-ui/react";
import { useRef } from "react";
import { COMPONENTS, NodeType, initialEdges, initialNodes } from "../constants";
import PaymentInit from "../Components/PaymentInit";
import PaymentCountry from "../Components/PaymentCountry";
import PaymentProvider from "../Components/PaymentProvider";
import CustomEdge from "../Components/CustomEdge";
import { v4 as uuid } from "uuid";

const nodeTypes = {
  paymentInit: PaymentInit,
  paymentCountry: PaymentCountry,
  paymentProvider: PaymentProvider,
};

const edgeTypes = {
  customEdge: CustomEdge,
};

export const Memoization = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const dragOutsideRef = useRef<NodeType | null>(null);

  const { screenToFlowPosition } = useReactFlow();

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

  return (
    <Box height={"100vh"} width="100vw" border="1px solid black">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        <Panel
          position="top-right"
          style={{
            border: "1px solid #ccc",
            padding: 12,
            borderRadius: 12,
            background: "white",
            width: 150,
            height: 500,
            overflowY: "auto",
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
        <Background />
        <Controls />
      </ReactFlow>
    </Box>
  );
};
