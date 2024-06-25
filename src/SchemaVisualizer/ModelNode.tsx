import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { Handle, NodeProps, Position } from "reactflow";
import { Model } from "./SchemaVisualizer.types";

export default function ModelNode({ data }: NodeProps<Model>) {
  return (
    <Box borderRadius="8px" minWidth="250px">
      {data.isChild && (
        <Handle id={data.name} position={Position.Top} type="target" />
      )}
      <Box p={1} textAlign="center" borderRadius="8px 8px 0 0" bg="#3d5787">
        <Text fontWeight={"bold"} color="white">
          <pre>{data.name}</pre>
        </Text>
      </Box>
      {data.fields.map(({ type, name, hasConnections }, index) => (
        <Flex
          _even={{ bg: "#282828" }}
          _odd={{ bg: "#232323" }}
          justifyContent={"space-between"}
          p={1}
          color="white"
        >
          <Text>
            <pre>{name}</pre>
          </Text>
          <Text>
            <pre>{type}</pre>
          </Text>
          {hasConnections && (
            <Handle
              position={Position.Right}
              id={`${data.name}-${name}`}
              type="source"
              style={{ top: 32 + 16 + 32 * index }}
            />
          )}
        </Flex>
      ))}
    </Box>
  );
}
