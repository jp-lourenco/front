import { SensorState } from './types';
import { AnyAction } from 'redux';

const initialState: SensorState = {
  loadingCreateSensorRequest: false,
  error: false,
  loadingGetSensorsRequest: false,
  mySensors: [],
  mySensorsFiltered: [],
  id: '',
};

export default function sensor(
  state = initialState,
  action: AnyAction,
): SensorState {
  switch (action.type) {
    case '@sensor/GET_SENSORS_REQUEST':
      return {
        ...state,
        loadingGetSensorsRequest: true,
      };
    case '@sensor/GET_SENSORS_SUCCESS':
      return {
        ...state,
        loadingGetSensorsRequest: false,
        mySensors: action.payload.sensors,
        mySensorsFiltered: action.payload.sensors,
      };
    case '@sensor/GET_SENSORS_FAILURE':
      return {
        ...state,
        loadingGetSensorsRequest: false,
      };
    case '@sensor/SET_MY_SENSORS_FILTERED':
      return {
        ...state,
        mySensorsFiltered: action.payload.mySensorsFiltered,
      };
    case '@sensor/CREATE_SENSOR_REQUEST':
      return {
        ...state,
        loadingCreateSensorRequest: true,
        error: false,
      };
    case '@sensor/CREATE_SENSOR_SUCCESS':
      return {
        ...state,
        loadingCreateSensorRequest: false,
        error: false,
      };
    case '@sensor/CREATE_SENSOR_FAILURE':
      return {
        ...state,
        error: true,
        loadingCreateSensorRequest: false,
      };
    case '@sensor/SET_ID':
      return {
        ...state,
        id: action.payload.id,
      };
    default:
      return state;
  }
}
