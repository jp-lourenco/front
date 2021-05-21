import { message } from 'antd';
import { takeLatest, call, put, all, select } from 'redux-saga/effects';
import api from '../../../services/api';
import * as actions from './actions';
import * as actionsAuth from '../auth/actions';

export function* createSensor() {
  try {
    const token = localStorage.getItem('token');

    const headerParams = {
      Authorization: 'Bearer ' + token,
    };

    const { id } = yield select(({ sensor }) => sensor);

    yield call(
      api.post,
      'sensors',
      {
        id: id,
      },
      { headers: headerParams },
    );

    yield put(actions.createSensorSuccess());
    yield put(actions.getSensorsRequest());
  } catch (err) {
    if (err.response.status === 403 || err.response.status === 401) {
      yield put(actionsAuth.logoutRequest());
    }
    yield put(actions.createSensorFailure());
  }
}

export function* getSensorsRequest() {
  try {
    const token = localStorage.getItem('token');

    const headerParams = {
      Authorization: 'Bearer ' + token,
    };

    const { data } = yield call(api.get, 'sensors', {
      headers: headerParams,
    });

    yield put(actions.getSensorsSuccess({ sensors: data }));
  } catch (err) {
    if (err.response.status === 403 || err.response.status === 401) {
      yield put(actionsAuth.logoutRequest());
    }
    yield put(actions.getSensorsFailure());
  }
}

export function* deleteSensor({
  payload,
}: {
  payload: { sensor_id: string };
  type: string;
}) {
  try {
    const token = localStorage.getItem('token');

    const headerParams = {
      Authorization: 'Bearer ' + token,
    };

    const { data } = yield call(api.delete, 'sensors/' + payload.sensor_id, {
      headers: headerParams,
    });
    yield put(actions.deleteSensorSuccess());
    yield put(actions.getSensorsRequest());
    message.success('Sensor deletado!');
  } catch (err) {
    if (err.response.status === 403 || err.response.status === 401) {
      yield put(actionsAuth.logoutRequest());
    }
    yield put(actions.deleteSensorFailure());
    message.error('Alguma coisa deu errada!');
  }
}

export function* syncSensor({
  payload,
}: {
  payload: { sensor_id: string };
  type: string;
}) {
  try {
    console.log(payload.sensor_id);
    const token = localStorage.getItem('token');

    const headerParams = {
      Authorization: 'Bearer ' + token,
    };

    const { data } = yield call(
      api.post,
      'sensors/' + payload.sensor_id + '/sync',
      {},
      {
        headers: headerParams,
      },
    );
    yield put(actions.syncSensorSuccess());
    yield put(actions.getSensorsRequest());
    message.success(data.msg);
  } catch (err) {
    if (err.response.status === 403 || err.response.status === 401) {
      //yield put(actionsAuth.logoutRequest());
    }
    console.log(err.response);
    yield put(actions.syncSensorFailure());
    message.error('Alguma coisa deu errada!');
  }
}

export default all([
  takeLatest('@sensor/GET_SENSORS_REQUEST', getSensorsRequest),
  takeLatest('@sensor/CREATE_SENSOR_REQUEST', createSensor),
  takeLatest('@sensor/DELETE_SENSOR_REQUEST', deleteSensor),
  takeLatest('@sensor/SYNC_SENSOR_REQUEST', syncSensor),
]);
