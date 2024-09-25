import { position } from "@chakra-ui/react";
import { useReactFlow } from "@xyflow/react";
import React, { KeyboardEventHandler, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

export default function useKeyBindings() {
  const [] = useState();
  const { setNodes } = useReactFlow();

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    const key = e.key?.toLowerCase();
    console.log("key down called");

    switch (true) {
      case e.ctrlKey && key === "d": {
        setNodes((prevNodes) => prevNodes.filter((node) => !node.selected));
        break;
      }
      case e.ctrlKey && key === "c": {
        setNodes((prevNodes) => {
          const selectedNode = prevNodes.find((node) => node.selected);
          if (!selectedNode) return prevNodes;
          return [
            ...prevNodes.map((node) =>
              node.id === selectedNode.id ? { ...node, selected: false } : node
            ),
            {
              ...selectedNode,
              id: uuid(),
              position: {
                x: selectedNode.position?.x + 40,
                y: selectedNode.position?.y + 40,
              },
              selected: true,
            },
          ];
        });
        break;
      }
      default: {
        break;
      }
    }
  };

  return handleKeyDown;
}
