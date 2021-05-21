export interface SensorState {
  loadingGetSensorsRequest: boolean;
  mySensors: Sensor[];
  mySensorsFiltered: Sensor[];
  loadingCreateSensorRequest: boolean;
  error: boolean;
  id: string;
}

export interface Sensor {
  _id: string;
  id: string;
}
