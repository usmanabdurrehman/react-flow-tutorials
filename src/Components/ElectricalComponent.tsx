import { Box, Icon, IconButton } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { Plus } from "react-bootstrap-icons";
import {
  Node,
  NodeProps,
  Position,
  useUpdateNodeInternals,
} from "@xyflow/react";
import { Capacitor, Inductor, Resistor } from "../icons";
import {
  ElectricalComponentProps,
  ElectricalComponentState,
  ElectricalComponentType,
} from "../types";
import Terminal from "./Terminal";
import { useStore } from "zustand";
import { useDarkMode } from "../store";
import { drag } from "d3-drag";
import { select } from "d3-selection";

type NumberNode = Node<ElectricalComponentProps, "string">;

export default function ElectricalComponent({
  data: { type, state },
  id,
  selected,
}: NodeProps<NumberNode>) {
  const { isDark } = useDarkMode();
  console.log({ selected });

  let color = "black";
  if (isDark) color = "white";
  if (state === ElectricalComponentState.Add) color = "green";

  const rotateControlRef = useRef(null);
  const updateNodeInternals = useUpdateNodeInternals();
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    if (!rotateControlRef.current) {
      return;
    }

    const selection = select(rotateControlRef.current);
    const dragHandler = drag().on("drag", (evt) => {
      const dx = evt.x - 100;
      const dy = evt.y - 100;
      const rad = Math.atan2(dx, dy);
      const deg = rad * (180 / Math.PI);
      setRotation(180 - deg);
      updateNodeInternals(id);
    });

    selection.call(dragHandler);
  }, [id, updateNodeInternals, selected]);

  return (
    <Box
      pos="relative"
      style={{
        transform: `rotate(${rotation}deg)`,
      }}
    >
      {selected && (
        <div
          ref={rotateControlRef}
          style={{
            position: "absolute",
            width: 10,
            height: 10,
            background: "#3367d9",
            left: "50%",
            top: -30,
            borderRadius: "100%",
            transform: "translate(-50%, 120%)",
            cursor: "alias",
          }}
        />
      )}
      {type === ElectricalComponentType.Capacitor && (
        <Capacitor color={color} height={24} />
      )}
      {type === ElectricalComponentType.Resistor && (
        <Resistor color={color} height={24} />
      )}
      {type === ElectricalComponentType.Inductor && (
        <Inductor color={color} height={24} />
      )}
      {state === ElectricalComponentState.Add && (
        <Plus
          style={{ position: "absolute", top: 10, right: 10 }}
          color={"green"}
        />
      )}
      <Terminal type="target" position={Position.Right} id="right" />
      <Terminal type="source" position={Position.Left} id="left" />
    </Box>
  );
}
