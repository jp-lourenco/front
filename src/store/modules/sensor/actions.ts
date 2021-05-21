import { Sensor } from './types';

export function getSensorsRequest() {
  return {
    type: '@sensor/GET_SENSORS_REQUEST',
  };
}

export function getSensorsSuccess({ sensors }: { sensors: Sensor[] }) {
  return {
    type: '@sensor/GET_SENSORS_SUCCESS',
    payload: {
      sensors,
    },
  };
}

export function getSensorsFailure() {
  return {
    type: '@sensor/GET_SENSORS_FAILURE',
  };
}

export function setMySensorsFiltered({
  mySensorsFiltered,
}: {
  mySensorsFiltered: Sensor[];
}) {
  return {
    type: '@sensor/SET_MY_SENSORS_FILTERED',
    payload: { mySensorsFiltered },
  };
}

export function createSensorRequest() {
  return {
    type: '@sensor/CREATE_SENSOR_REQUEST',
  };
}

export function createSensorSuccess() {
  return {
    type: '@sensor/CREATE_SENSOR_SUCCESS',
  };
}

export function createSensorFailure() {
  return {
    type: '@sensor/CREATE_SENSOR_FAILURE',
  };
}

export function setIdentificador({ id }: { id: string }) {
  return {
    type: '@sensor/SET_ID',
    payload: { id },
  };
}

export function deleteSensorRequest({ sensor_id }: { sensor_id: string }) {
  return {
    type: '@sensor/DELETE_SENSOR_REQUEST',
    payload: {
      sensor_id,
    },
  };
}

export function deleteSensorSuccess() {
  return {
    type: '@sensor/DELETE_SENSOR_SUCCESS',
  };
}

export function deleteSensorFailure() {
  return {
    type: '@sensor/DELETE_SENSOR_FAILURE',
  };
}

export function syncSensorRequest({ sensor_id }: { sensor_id: string }) {
  return {
    type: '@sensor/SYNC_SENSOR_REQUEST',
    payload: {
      sensor_id,
    },
  };
}

export function syncSensorSuccess() {
  return {
    type: '@sensor/SYNC_SENSOR_SUCCESS',
  };
}

export function syncSensorFailure() {
  return {
    type: '@sensor/SYNC_SENSOR_FAILURE',
  };
}
