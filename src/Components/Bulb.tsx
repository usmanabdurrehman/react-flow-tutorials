import { Handle, Node, NodeProps, Position } from "@xyflow/react";
import React from "react";
import { ElectricalComponentData, ElectricalComponentType } from "../types";
import { Box, Text } from "@chakra-ui/react";
import { default as BulbIcon } from "../icons/Bulb";
import { getUnit } from "../utils";
import Terminal from "./Terminal";

type BulbNode = Node<ElectricalComponentData, "string">;

export default function Bulb({ type, data: { value } }: NodeProps<BulbNode>) {
  const unit = getUnit(type as ElectricalComponentType);

  return (
    <Box>
      <BulbIcon isOn height={64} />
      <Text fontSize="xx-small" position={"absolute"}>
        {value} {unit}
      </Text>
      <Terminal
        style={{ top: 50, right: 22 }}
        type="source"
        position={Position.Right}
        id="right"
      />
      <Terminal
        style={{ top: 50, left: 22 }}
        type="source"
        position={Position.Left}
        id="left"
      />
    </Box>
  );
}
