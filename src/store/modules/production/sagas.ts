import { takeLatest, call, put, all, select } from 'redux-saga/effects';
import api from '../../../services/api';
import * as actions from './actions';

export function* createProduction() {
  try {
    const { title, category, food_name, batch_codes } = yield select(
      ({ production }) => production,
    );
    if (batch_codes.length > 0) {
      yield call(api.post, 'productions', {
        title: title,
        category: category,
        food_name: food_name,
        batchs: batch_codes,
      });
    } else {
      yield call(api.post, 'productions', {
        title: title,
        category: category,
        food_name: food_name,
      });
    }
    yield put(actions.createProductionSuccess());
  } catch (err) {
    yield put(actions.createProductionFailure());
  }
}

export default all([
  takeLatest('@production/CREATE_PRODUCTION_REQUEST', createProduction),
]);
