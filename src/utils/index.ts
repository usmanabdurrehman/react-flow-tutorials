import { ReactFlowState } from "@xyflow/react";
import { ElectricalComponentType } from "../types";

export const zoomSelector = (s: ReactFlowState) => s.transform[2] >= 0.7;

export function isPointInBox(
  point: { x: number; y: number },
  box: { x: number; y: number; width: number; height: number }
) {
  return (
    point.x >= box.x &&
    point.x <= box.x + box.width &&
    point.y >= box.y &&
    point.y <= box.y + box.height
  );
}

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

export function downloadImage(dataUrl: string) {
  const a = document.createElement("a");

  a.setAttribute("download", "reactflow.png");
  a.setAttribute("href", dataUrl);
  a.click();
}
