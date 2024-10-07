import { Node, useReactFlow } from "@xyflow/react";
import React, { useEffect } from "react";
import { v4 as uuid } from "uuid";

export default function useKeyBindings({
  removeNode,
  undo,
  redo,
}: {
  removeNode: (node: Node | undefined) => void;
  undo: () => void;
  redo: () => void;
}) {
  const { setNodes, getNodes } = useReactFlow();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key?.toLowerCase();

      switch (true) {
        case e.ctrlKey && key === "z": {
          undo();
          break;
        }
        case e.ctrlKey && key === "y": {
          redo();
          break;
        }
        case key === "delete": {
          const selectedNode = getNodes().find((node) => node.selected);
          removeNode(selectedNode);
          break;
        }
        case e.ctrlKey && key === "d": {
          const selectedNode = getNodes().find((node) => node.selected);
          if (!selectedNode) return;
          setNodes((prevNodes) => {
            return [
              ...prevNodes.map((node) =>
                node.selected ? { ...node, selected: false } : node
              ),
              {
                ...selectedNode,
                id: uuid(),
                position: {
                  x: selectedNode?.position?.x + 40,
                  y: selectedNode?.position?.y + 40,
                },
                selected: true,
              },
            ];
          });
          break;
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [getNodes, removeNode, setNodes, undo, redo]);

  return null;
}
