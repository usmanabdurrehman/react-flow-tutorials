import { ElectricalComponentType } from "../types";

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
