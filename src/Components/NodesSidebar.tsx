import { Flex, IconButton, Text } from "@chakra-ui/react";
import React from "react";
import { COMPONENTS, NodeType } from "../constants";

export const NodesSidebar = React.memo(
  ({
    onDragStart,
  }: {
    onDragStart: (
      event: React.DragEvent<HTMLButtonElement>,
      type: NodeType
    ) => void;
  }) => {
    return (
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
    );
  }
);
