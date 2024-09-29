import { Node, useReactFlow } from "@xyflow/react";
import React, { useEffect } from "react";
import { v4 as uuid } from "uuid";

export default function useKeyBindings({
  undo,
  redo,
  removeNode,
}: {
  undo: () => void;
  redo: () => void;
  removeNode: (node: Node | undefined) => void;
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
          setNodes((prevNodes) => {
            const selectedNode = prevNodes.find((node) => node.selected);
            if (!selectedNode) return prevNodes;
            return [
              ...prevNodes.map((node) =>
                node.id === selectedNode.id
                  ? { ...node, selected: false }
                  : node
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
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [setNodes, getNodes, undo, redo, removeNode]);

  return null;
}
