import { Edge, Node } from "@xyflow/react";
import { ElectricalComponentType } from "../types";
import { Battery, Bulb, Capacitor, Inductor, Resistor } from "../icons";
import { Box } from "@chakra-ui/react";

export const initialEdges: Edge[] = [];

export const initialNodes: Node[] = [
  {
    id: "1",
    position: { x: 100, y: 100 },
    type: "electricalComponent",
    data: { type: ElectricalComponentType.Resistor, value: 3 },
  },
  {
    id: "2",
    position: { x: 200, y: 200 },
    type: "electricalComponent",
    data: { type: ElectricalComponentType.Capacitor, value: 3 },
  },
  {
    id: "3",
    position: { x: 300, y: 300 },
    type: "electricalComponent",
    data: { type: ElectricalComponentType.Inductor, value: 3 },
  },
];

export const COMPONENTS = [
  {
    icon: <Resistor />,
    type: ElectricalComponentType.Resistor,
    label: "Resistor",
  },
  {
    icon: <Capacitor height={16} />,
    type: ElectricalComponentType.Capacitor,
    label: "Capacitor",
  },
  {
    icon: <Inductor height={8} />,
    type: ElectricalComponentType.Inductor,
    label: "Inductor",
  },
  {
    icon: <Battery height={24} />,
    type: ElectricalComponentType.Battery,
    label: "Battery",
  },
  {
    icon: <Bulb color="black" height={24} isOn />,
    type: ElectricalComponentType.Bulb,
    label: "Bulb",
  },
  {
    icon: (
      <Box
        height="18px"
        width="18px"
        borderRadius="4px"
        border="1px solid black"
      ></Box>
    ),
    type: ElectricalComponentType.Board,
    label: "Bulb",
  },
];
