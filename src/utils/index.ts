import { ReactFlowState } from "@xyflow/react";
import { ElectricalComponentType } from "../types";

export const zoomSelector = (s: ReactFlowState) => s.transform[2] >= 0.7;

export const isPointInBox = (
  point: { x: number; y: number },
  box: { x: number; y: number; height: number; width: number }
) => {
  return (
    point.x >= box.x &&
    point.x <= box.x + box.width &&
    point.y >= box.y &&
    point.y <= box.y + box.height
  );
};

export function getUnit(type: ElectricalComponentType) {
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
    case ElectricalComponentType.Battery: {
      unit = "V";
      break;
    }
    case ElectricalComponentType.Bulb: {
      unit = "W";
      break;
    }
  }
  return unit;
}
