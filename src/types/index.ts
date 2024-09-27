export enum ElectricalComponentState {
  Add = "add",
  NotAdd = "notAdd",
}

export enum ElectricalComponentType {
  Resistor = "resistor",
  Capacitor = "capacitor",
  Bulb = "bulb",
  Inductor = "inductor",
  Battery = "battery",
  Board = "board",
}

export type ElectricalComponentData = {
  type?: ElectricalComponentType;
  state?: ElectricalComponentState;
  value: number;
  visible?: boolean;
  connectable?: boolean;
  rotation?: boolean;
  isAttachedToGroup?: boolean;
};
