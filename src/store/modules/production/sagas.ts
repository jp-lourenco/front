import { message } from 'antd';
import { takeLatest, call, put, all, select } from 'redux-saga/effects';
import api from '../../../services/api';
import * as actions from './actions';
import * as actionsAuth from '../auth/actions';

export function* createProduction() {
  try {
    const token = localStorage.getItem('token');

    const headerParams = {
      Authorization: 'Bearer ' + token,
    };

    const { title, category, food_name, batch_codes } = yield select(
      ({ production }) => production,
    );
    if (batch_codes.length > 0) {
      yield call(
        api.post,
        'productions',
        {
          title: title,
          category: category,
          food_name: food_name,
          batchs: batch_codes,
        },
        { headers: headerParams },
      );
    } else {
      yield call(
        api.post,
        'productions',
        {
          title: title,
          category: category,
          food_name: food_name,
        },
        { headers: headerParams },
      );
    }
    yield put(actions.createProductionSuccess());
    yield put(actions.getProductionsByUserRequest());
  } catch (err) {
    if (err.response.status === 403 || err.response.status === 401) {
      yield put(actionsAuth.logoutRequest());
    }
    yield put(actions.createProductionFailure());
  }
}

export function* editProduction({
  payload,
}: {
  payload: { _id: string };
  type: string;
}) {
  try {
    const {
      title,
      production_start,
      production_location,
      production_end,
      production_description,
      temp_ideal,
      temp_max,
      temp_min,
      humi_ideal,
      humi_min,
      humi_max,
      batch_codes,
    } = yield select(({ production }) => production);

    const token = localStorage.getItem('token');

    const headerParams = {
      Authorization: 'Bearer ' + token,
    };

    if (batch_codes.length > 0) {
      yield call(
        api.put,
        'productions/' + payload._id,
        {
          title: title,
          production_start: production_start,
          production_location: production_location,
          production_end: production_end,
          production_description: production_description,
          temp_ideal: temp_ideal,
          temp_max: temp_max,
          temp_min: temp_min,
          humi_ideal: humi_ideal,
          humi_min: humi_min,
          humi_max: humi_max,
          batchs: batch_codes,
        },
        { headers: headerParams },
      );
    } else {
      yield call(
        api.put,
        'productions/' + payload._id,
        {
          title: title,
          production_start: production_start,
          production_location: production_location,
          production_end: production_end,
          production_description: production_description,
          temp_ideal: temp_ideal,
          temp_max: temp_max,
          temp_min: temp_min,
          humi_ideal: humi_ideal,
          humi_min: humi_min,
          humi_max: humi_max,
        },
        { headers: headerParams },
      );
    }
    yield put(actions.editProductionSuccess());
    yield put(actions.getProductionsByUserRequest());
  } catch (err) {
    if (err.response.status === 403 || err.response.status === 401) {
      yield put(actionsAuth.logoutRequest());
    }
    yield put(actions.editProductionFailure());
  }
}

export function* getProductionsByUser() {
  try {
    const token = localStorage.getItem('token');

    const headerParams = {
      Authorization: 'Bearer ' + token,
    };

    const { data } = yield call(api.get, 'productions', {
      headers: headerParams,
    });
    yield put(actions.getProductionsByUserSuccess({ productions: data }));
  } catch (err) {
    if (err.response.status === 403 || err.response.status === 401) {
      yield put(actionsAuth.logoutRequest());
    }
    yield put(actions.getProductionsByUserFailure());
  }
}

export function* deleteProduction({
  payload,
}: {
  payload: { production_id: string };
  type: string;
}) {
  try {
    const token = localStorage.getItem('token');

    const headerParams = {
      Authorization: 'Bearer ' + token,
    };

    const { data } = yield call(
      api.delete,
      'productions/' + payload.production_id,
      {
        headers: headerParams,
      },
    );
    yield put(actions.deleteProductionSuccess());
    yield put(actions.getProductionsByUserRequest());
    message.success('Produção deletada!');
  } catch (err) {
    if (err.response.status === 403 || err.response.status === 401) {
      yield put(actionsAuth.logoutRequest());
    }
    yield put(actions.deleteProductionFailure());
    message.error('Alguma coisa deu errada!');
  }
}

export default all([
  takeLatest('@production/CREATE_PRODUCTION_REQUEST', createProduction),
  takeLatest('@production/EDIT_PRODUCTION_REQUEST', editProduction),
  takeLatest(
    '@production/GET_PRODUCTIONS_BY_USER_REQUEST',
    getProductionsByUser,
  ),
  takeLatest('@production/DELETE_PRODUCTION_REQUEST', deleteProduction),
]);
