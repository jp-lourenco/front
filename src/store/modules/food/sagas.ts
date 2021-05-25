import { message } from 'antd';
import { takeLatest, call, put, all, select } from 'redux-saga/effects';
import api from '../../../services/api';
import * as actions from './actions';
import * as actionsAuth from '../auth/actions';

export function* getFoodsRequest() {
  try {
    const token = localStorage.getItem('token');

    const headerParams = {
      Authorization: 'Bearer ' + token,
    };

    const { data } = yield call(api.get, 'foods', {
      headers: headerParams,
    });

    yield put(actions.getFoodsSuccess({ foods: data }));
  } catch (err) {
    if (err.response.status === 403 || err.response.status === 401) {
      yield put(actionsAuth.logoutRequest());
    }
    yield put(actions.getFoodsFailure());
  }
}

export function* createFood() {
  try {
    const token = localStorage.getItem('token');

    const headerParams = {
      Authorization: 'Bearer ' + token,
    };

    const { name, category } = yield select(({ food }) => food);

    yield call(
      api.post,
      'foods',
      {
        food_name: name,
        category: category,
      },
      { headers: headerParams },
    );

    yield put(actions.createFoodSuccess());
    yield put(actions.getFoodsRequest());
  } catch (err) {
    if (err.response.status === 403 || err.response.status === 401) {
      yield put(actionsAuth.logoutRequest());
    }
    yield put(actions.createFoodFailure());
  }
}

export function* deleteFood({
  payload,
}: {
  payload: { food_id: string };
  type: string;
}) {
  try {
    const token = localStorage.getItem('token');

    const headerParams = {
      Authorization: 'Bearer ' + token,
    };

    const { data } = yield call(api.delete, 'foods/' + payload.food_id, {
      headers: headerParams,
    });
    yield put(actions.deleteFoodSuccess());
    yield put(actions.getFoodsRequest());
    message.success('Alimento deletado!');
  } catch (err) {
    if (err.response.status === 403 || err.response.status === 401) {
      yield put(actionsAuth.logoutRequest());
    }
    yield put(actions.deleteFoodFailure());
    message.error('Alguma coisa deu errada!');
  }
}

export default all([
  takeLatest('@food/GET_FOODS_REQUEST', getFoodsRequest),
  takeLatest('@food/CREATE_FOOD_REQUEST', createFood),
  takeLatest('@food/DELETE_FOOD_REQUEST', deleteFood),
]);
