export enum ElectricalComponentState {
  Add = "add",
  NotAdd = "notAdd",
}

export enum ElectricalComponentType {
  Resistor = "resistor",
  Capacitor = "capacitor",
  Transistor = "transistor",
  Inductor = "inductor",
  Battery = "battery",
  Board = "board",
}

export type ElectricalComponentProps = {
  type: ElectricalComponentType;
  state?: ElectricalComponentState;
  value: number;
  visible: boolean;
  connectable: boolean;
  rotation: boolean;
};
