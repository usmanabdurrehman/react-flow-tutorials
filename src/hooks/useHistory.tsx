import { useCallback, useEffect, useRef, useState } from "react";
import { HistoryAction } from "../Workflow/Workflow.constants";
import { useReactFlow, type Node } from "@xyflow/react";

type HistoryItem = {
  action: HistoryAction;
  data: any;
};

export const useHistory = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const currentIndex = useRef(-1);

  const { setNodes } = useReactFlow();

  const canUndo = currentIndex.current > -1;
  const canRedo = currentIndex.current < history.length - 1;

  const addToHistory = useCallback(
    (newState: HistoryItem) => {
      const newHistory = [...history].slice(0, currentIndex.current + 1);
      newHistory.push(newState);
      setHistory(newHistory);
      currentIndex.current += 1;
    },
    [history, currentIndex]
  );

  const addNode = (node: Node | undefined, shouldAddToHistory = true) => {
    if (node) setNodes((nds) => nds.concat(node as Node));
    if (shouldAddToHistory) {
      addToHistory({
        action: HistoryAction.AddNode,
        data: node,
      });
    }
  };

  const removeNode = (node: Node | undefined, shouldAddToHistory = true) => {
    if (node) setNodes((nds) => nds.filter((n) => n.id !== node.id));
    if (shouldAddToHistory) {
      addToHistory({
        action: HistoryAction.RemoveNode,
        data: node,
      });
    }
  };

  const undo = useCallback(() => {
    console.log({ history, currentIndex });
    console.log("undo");
    if (canUndo) {
      const { action, data } = history[currentIndex.current] || {};
      currentIndex.current -= 1;
      console.log(action, data);
      switch (action) {
        case HistoryAction.AddNode:
          removeNode(data, false);
          break;
        case HistoryAction.RemoveNode:
          break;
      }
    }
  }, [canUndo, currentIndex, history, removeNode]);

  const redo = useCallback(() => {
    console.log({ history, currentIndex });
    console.log("redo");
    if (canRedo) {
      currentIndex.current += 1;
      const { action, data } = history[currentIndex.current] || {};
      switch (action) {
        case HistoryAction.AddNode:
          addNode(data, false);
          break;
        case HistoryAction.RemoveNode:
          break;
      }
    }
  }, [canRedo, currentIndex, history, addNode]);

  useEffect(() => {
    console.log({ history, currentIndex });
  }, [history, currentIndex]);

  return { addNode, removeNode, undo, redo };
};
