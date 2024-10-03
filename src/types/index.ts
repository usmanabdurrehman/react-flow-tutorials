export enum ElectricalComponentType {
  Resistor = "resistor",
  Capacitor = "capacitor",
  Bulb = "bulb",
  Inductor = "inductor",
  Battery = "battery",
  Board = "board",
}

export type ElectricalComponentData = {
  value?: number;
  type?: ElectricalComponentType;
  rotation?: number;
};
