export enum ElectricalComponentState {
  Add = "add",
  NotAdd = "notAdd",
}

export enum ElectricalComponentType {
  Resistor = "resistor",
  Capacitor = "capacitor",
  Transistor = "transistor",
  Inductor = "inductor",
}

export enum ElectricalComponentUnit {
  Ohm = "ohm",
  Farad = "farad",
}

export type ElectricalComponentProps = {
  type: ElectricalComponentType;
  state?: ElectricalComponentState;
  unit?: ElectricalComponentUnit;
  value: number;
};
