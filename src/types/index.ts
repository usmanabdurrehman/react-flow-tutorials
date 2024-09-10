export enum ElectricalComponentState {
  Add = "add",
  NotAdd = "notAdd",
}

export enum ElectricalComponentType {
  Resistor = "resistor",
  Capacitor = "capacitor",
  Transistor = "transistor",
}

export enum ElectricalComponentUnit {
  Ohm = "ohm",
  Farad = "farad",
}

export type ElectricalComponentProps = {
  type: ElectricalComponentType;
  unit?: ElectricalComponentUnit;
  value: number;
};