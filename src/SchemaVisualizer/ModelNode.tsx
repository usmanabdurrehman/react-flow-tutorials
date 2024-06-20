import { Box, Flex, Text } from "@chakra-ui/react";
import { Handle, NodeProps, Position } from "reactflow";
import { Model } from "./SchemaVisualizer.types";

export default function ModelNode({ data, id }: NodeProps<Model>) {
  return (
    <Box borderRadius="8px" minWidth="250px">
      {data.isChild && (
        <Handle type={"target"} position={Position.Top} id={data.name} />
      )}
      <Box bg="#42CE8F" p={1} textAlign="center">
        <Text fontWeight={"bold"} size="sm">
          <pre>{data.name}</pre>
        </Text>
      </Box>
      {data.fields.map(({ name, type, hasConnections, id }, index) => (
        <Flex
          _even={{ bg: "#282828" }}
          _odd={{ bg: "#232323" }}
          color="white"
          p={1}
          justifyContent="space-between"
        >
          <Text size="sm">
            <pre>{name}</pre>
          </Text>
          <Flex gap={1}>
            <Text size="sm">
              <pre>{type}</pre>
            </Text>
          </Flex>

          {hasConnections && (
            <Handle
              id={`${data.name}-${name}`}
              type={"source"}
              position={Position.Right}
              style={{ top: 32 + 16 + 32 * index }}
            />
          )}
        </Flex>
      ))}
    </Box>
  );
}
