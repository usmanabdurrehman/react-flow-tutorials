import React, { useCallback, useRef, useState } from "react";
import { HistoryAction } from "../types";
import { Edge, Node, useReactFlow } from "@xyflow/react";

type HistoryItem = {
  action: HistoryAction;
  data: Node | Edge | undefined;
};

export default function useHistory() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const currentIndex = useRef(-1);

  const { setNodes, setEdges } = useReactFlow();

  const addToHistory = useCallback(
    (newState: HistoryItem) => {
      const newHistory = [...history].slice(0, currentIndex.current + 1);
      newHistory.push(newState);
      setHistory(newHistory);
      currentIndex.current += 1;
    },
    [history]
  );

  const addNode = useCallback(
    (node: Node | undefined, shouldAddToHistory = true) => {
      if (node) setNodes((prevNodes) => prevNodes.concat(node));
      if (shouldAddToHistory)
        addToHistory({
          action: HistoryAction.AddNode,
          data: node,
        });
    },
    [addToHistory, setNodes]
  );

  const addEdge = useCallback(
    (edge: Edge | undefined, shouldAddToHistory = true) => {
      if (edge) setEdges((prevEdges) => prevEdges.concat(edge));
      if (shouldAddToHistory)
        addToHistory({
          action: HistoryAction.AddEdge,
          data: edge,
        });
    },
    [addToHistory, setEdges]
  );

  const removeNode = useCallback(
    (node: Node | undefined, shouldAddToHistory = true) => {
      if (node)
        setNodes((prevNodes) =>
          prevNodes.filter((prevNode) => prevNode.id !== node.id)
        );
      if (shouldAddToHistory)
        addToHistory({
          action: HistoryAction.RemoveNode,
          data: node,
        });
    },
    [addToHistory, setNodes]
  );

  const removeEdge = useCallback(
    (edge: Edge | undefined, shouldAddToHistory = true) => {
      if (edge)
        setEdges((prevEdges) =>
          prevEdges.filter((prevEdge) => prevEdge.id !== edge.id)
        );
      if (shouldAddToHistory)
        addToHistory({
          action: HistoryAction.RemoveEdge,
          data: edge,
        });
    },
    [addToHistory, setEdges]
  );

  const undo = useCallback(() => {
    const canUndo = currentIndex.current > -1;
    if (canUndo) {
      const { action, data } = history[currentIndex.current] || {};
      currentIndex.current -= 1;
      switch (action) {
        case HistoryAction.AddNode: {
          removeNode(data as Node, false);
          break;
        }
        case HistoryAction.AddEdge: {
          removeEdge(data as Edge, false);
          break;
        }
        case HistoryAction.RemoveNode: {
          addNode(data as Node, false);
          break;
        }
        case HistoryAction.RemoveEdge: {
          addEdge(data as Edge, false);
          break;
        }
      }
    }
  }, [addEdge, addNode, history, removeEdge, removeNode]);

  const redo = useCallback(() => {
    const canRedo = currentIndex.current < history.length - 1;
    if (canRedo) {
      currentIndex.current += 1;
      const { action, data } = history[currentIndex.current] || {};
      switch (action) {
        case HistoryAction.AddNode: {
          addNode(data as Node, false);
          break;
        }
        case HistoryAction.AddEdge: {
          addEdge(data as Edge, false);
          break;
        }
        case HistoryAction.RemoveNode: {
          removeNode(data as Node, false);
          break;
        }
        case HistoryAction.RemoveEdge: {
          removeEdge(data as Edge, false);
          break;
        }
      }
    }
  }, [addEdge, addNode, history, removeEdge, removeNode]);

  return { addNode, removeNode, addEdge, removeEdge, undo, redo };
}
