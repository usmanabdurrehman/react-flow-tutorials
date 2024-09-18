import { Box, Icon, IconButton, Text } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { Plus, X } from "react-bootstrap-icons";
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
  data: { type, state, value, visible = true },
  id,
  selected,
}: NodeProps<NumberNode>) {
  const { isDark } = useDarkMode();
  const isAdditionValid = state === ElectricalComponentState.Add;
  const isAdditionInvalid = state === ElectricalComponentState.NotAdd;

  let color = "black";
  if (isDark || isAdditionValid || isAdditionInvalid) color = "white";

  const rotateControlRef = useRef(null);
  const updateNodeInternals = useUpdateNodeInternals();
  const [rotation, setRotation] = useState(0);

  let unit;
  switch (type) {
    case ElectricalComponentType.Resistor: {
      unit = "kΩ";
      break;
    }
    case ElectricalComponentType.Inductor: {
      unit = "H";
      break;
    }
    case ElectricalComponentType.Capacitor: {
      unit = "μF";
      break;
    }
  }

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

      let degs = [0, 90, 180, 270, 360];
      const rotation = 180 - deg;
      const newRotation = degs?.find((deg) => {
        if (Math.abs(deg - rotation) <= 45 || Math.abs(deg + rotation) <= 4)
          return true;
      });
      if (newRotation) setRotation(newRotation);
      updateNodeInternals(id);
    });

    selection.call(dragHandler as any);
  }, [id, updateNodeInternals, selected]);

  return (
    <Box
      pos="relative"
      style={{
        transform: `rotate(${rotation}deg)`,
        visibility: visible ? "visible" : "hidden",
        ...(isAdditionValid && {
          background: "#58ed58",
        }),
        ...(isAdditionInvalid && {
          background: "#ff5050",
        }),
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
      {isAdditionValid && (
        <Plus style={{ position: "absolute", top: -17, right: 2, color }} />
      )}
      {isAdditionInvalid && (
        <X style={{ position: "absolute", top: -17, right: 2, color }} />
      )}
      <Text
        fontSize="xx-small"
        style={{
          position: "absolute",
          color,
        }}
      >
        {value} {unit}
      </Text>
      <Terminal type="source" position={Position.Right} id="right" />
      <Terminal type="source" position={Position.Left} id="left" />
    </Box>
  );
}
