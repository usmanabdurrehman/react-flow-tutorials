import { useCallback, useState } from "react";
import { Bulb as BulbIcon } from "../icons";
import { useDarkMode } from "../store";
import Terminal from "./Terminal";
import { Node, NodeProps, Position } from "@xyflow/react";
import { Box, Text } from "@chakra-ui/react";
import { ElectricalComponentData, ElectricalComponentType } from "../types";
import { getUnit } from "../utils";

type BulbNode = Node<ElectricalComponentData, "string">;

export default function Bulb({ data: { value }, type }: NodeProps<BulbNode>) {
  const { isDark } = useDarkMode();
  let color = "black";
  if (isDark) color = "white";

  const [isOn, setIsOn] = useState(false);

  const unit = getUnit(type as ElectricalComponentType);

  return (
    <Box height="64px" onClick={() => setIsOn(!isOn)}>
      <BulbIcon color={color} isOn={isOn} height={64} />
      <Text fontSize="xx-small" pos="absolute" color={color}>
        {value} {unit}
      </Text>
      <Terminal
        style={{ top: 50, left: 22 }}
        type="source"
        position={Position.Left}
        id="right"
      />
      <Terminal
        style={{ top: 50, right: 22 }}
        type="source"
        position={Position.Right}
        id="left"
      />
    </Box>
  );
}
