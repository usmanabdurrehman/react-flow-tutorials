import { Box, Icon, IconButton, Text } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { Copy, Plus, X } from "react-bootstrap-icons";
import {
  Node,
  NodeProps,
  NodeToolbar,
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
import Rotator from "./Rotator";

type ElectricalComponentNode = Node<ElectricalComponentProps, "string">;

export default function ElectricalComponent({
  data: { type, state, value, visible = true, connectable, rotation },
  id,
  selected,
}: NodeProps<ElectricalComponentNode>) {
  const { isDark } = useDarkMode();
  const isAdditionValid = state === ElectricalComponentState.Add;
  const isAdditionInvalid = state === ElectricalComponentState.NotAdd;

  let color = "black";
  if (isDark) color = "white";

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
      <Rotator id={id} selected={selected} />
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
      <Terminal
        type="source"
        position={Position.Right}
        id="right"
        isConnectable={connectable}
      />
      <Terminal
        type="source"
        position={Position.Left}
        id="left"
        isConnectable={connectable}
      />
    </Box>
  );
}
