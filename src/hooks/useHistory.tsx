import { useCallback, useEffect, useRef, useState } from "react";
import { HistoryAction } from "../constants";
import { Edge, useReactFlow, type Node } from "@xyflow/react";

type HistoryItem = {
  action: HistoryAction;
  data: any;
};

export const useHistory = ({
  setSelectedNode,
}: {
  setSelectedNode: (node: Node | null) => void;
}) => {
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
    [history, currentIndex]
  );

  const addNode = useCallback(
    (node: Node | undefined, shouldAddToHistory = true) => {
      if (node) setNodes((nds) => nds.concat(node as Node));
      if (shouldAddToHistory) {
        addToHistory({
          action: HistoryAction.AddNode,
          data: node,
        });
      }
    },
    [addToHistory, setNodes]
  );

  const addEdge = useCallback(
    (edge: Edge | undefined, shouldAddToHistory = true) => {
      if (edge) setEdges((edges) => edges.concat(edge as Edge));
      if (shouldAddToHistory) {
        addToHistory({
          action: HistoryAction.AddEdge,
          data: edge,
        });
      }
    },
    [addToHistory, setEdges]
  );

  const removeNode = useCallback(
    (node: Node | undefined, shouldAddToHistory = true) => {
      if (node) {
        setSelectedNode(null);
        setNodes((nds) => nds.filter((n) => n.id !== node.id));
      }
      if (shouldAddToHistory) {
        addToHistory({
          action: HistoryAction.RemoveNode,
          data: node,
        });
      }
    },
    [addToHistory, setNodes]
  );

  const removeEdge = useCallback(
    (edge: Edge | undefined, shouldAddToHistory = true) => {
      if (edge) {
        setSelectedNode(null);
        setEdges((nds) => nds.filter((n) => n.id !== edge.id));
      }
      if (shouldAddToHistory) {
        addToHistory({
          action: HistoryAction.RemoveEdge,
          data: edge,
        });
      }
    },
    [addToHistory, setEdges]
  );

  const undo = useCallback(() => {
    const canUndo = currentIndex.current > -1;
    if (canUndo) {
      const { action, data } = history[currentIndex.current] || {};
      currentIndex.current -= 1;
      switch (action) {
        case HistoryAction.AddNode:
          removeNode(data, false);
          break;
        case HistoryAction.RemoveNode:
          addNode(data, false);
          break;
        case HistoryAction.AddEdge:
          removeEdge(data, false);
          break;
        case HistoryAction.RemoveEdge:
          addEdge(data, false);
          break;
      }
    }
  }, [history, removeNode, addNode, removeEdge, addEdge]);

  const redo = useCallback(() => {
    const canRedo = currentIndex.current < history.length;
    if (canRedo) {
      currentIndex.current += 1;
      const { action, data } = history[currentIndex.current] || {};
      switch (action) {
        case HistoryAction.AddNode:
          addNode(data, false);
          break;
        case HistoryAction.RemoveNode:
          removeNode(data, false);
          break;
        case HistoryAction.AddEdge:
          addEdge(data, false);
          break;
        case HistoryAction.RemoveEdge:
          removeEdge(data, false);
          break;
      }
    }
  }, [currentIndex, history, addNode, removeNode, addEdge, removeEdge]);

  return { addNode, removeNode, addEdge, removeEdge, undo, redo };
};
