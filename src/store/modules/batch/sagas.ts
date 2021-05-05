import { message } from 'antd';
import { takeLatest, call, put, all, select } from 'redux-saga/effects';
import api from '../../../services/api';
import * as actions from './actions';
import * as actionsProductions from '../production/actions';
import * as actionsAuth from '../auth/actions';

export function* readQrcode({
  payload,
}: {
  payload: { qrcode: string };
  type: string;
}) {
  try {
    const token = localStorage.getItem('token');

    const headerParams = {
      Authorization: 'Bearer ' + token,
    };

    const { data } = yield call(
      api.post,
      'productions/batchs/read-qrcode',
      {
        batch_id: payload.qrcode,
      },
      { headers: headerParams },
    );
    yield put(actions.readQrcodeSuccess());
  } catch (err) {
    if (err.response.status === 403 || err.response.status === 401) {
      yield put(actionsAuth.logoutRequest());
    }
    yield put(actions.readQrcodeFailure({ msg: err.response.data.msg }));
  }
}

export function* deleteBatch({
  payload,
}: {
  payload: { batch_id: string };
  type: string;
}) {
  try {
    const token = localStorage.getItem('token');

    const headerParams = {
      Authorization: 'Bearer ' + token,
    };

    const { data } = yield call(
      api.delete,
      'productions/batchs/' + payload.batch_id,
      {
        headers: headerParams,
      },
    );
    yield put(actions.deleteBatchSuccess());
    yield put(actionsProductions.getProductionsByUserRequest());
    message.success('Lote deletado!');
  } catch (err) {
    if (err.response.status === 403 || err.response.status === 401) {
      yield put(actionsAuth.logoutRequest());
    }
    yield put(actions.deleteBatchFailure());
    message.error('Alguma coisa deu errada!');
  }
}

export function* editBatch({
  payload,
}: {
  payload: { batch_id: string };
  type: string;
}) {
  try {
    const { batch_code, amount_produced } = yield select(({ batch }) => batch);

    const token = localStorage.getItem('token');

    const headerParams = {
      Authorization: 'Bearer ' + token,
    };

    yield call(
      api.put,
      'productions/batchs/' + payload.batch_id,
      {
        batch_code: batch_code,
        amount_produced: amount_produced,
      },
      { headers: headerParams },
    );

    yield put(actions.editBatchSuccess());
    yield put(actionsProductions.getProductionsByUserRequest());
  } catch (err) {
    if (err.response.status === 403 || err.response.status === 401) {
      yield put(actionsAuth.logoutRequest());
    }
    yield put(actions.editBatchFailure());
  }
}

export function* editBatchTransformer({
  payload,
}: {
  payload: { batch_id: string };
  type: string;
}) {
  try {
    const {
      packing_date,
      packing_size,
      processed_quantity,
      transformation_description,
    } = yield select(({ batch }) => batch);

    const token = localStorage.getItem('token');

    const headerParams = {
      Authorization: 'Bearer ' + token,
    };

    yield call(
      api.put,
      'productions/batchs/' + payload.batch_id,
      {
        packing_date: packing_date,
        packing_size: packing_size,
        processed_quantity: processed_quantity,
        transformation_description: transformation_description,
      },
      { headers: headerParams },
    );

    yield put(actions.editBatchSuccess());
    yield put(actionsProductions.getProductionsByUserRequest());
  } catch (err) {
    if (err.response.status === 403 || err.response.status === 401) {
      yield put(actionsAuth.logoutRequest());
    }
    yield put(actions.editBatchFailure());
  }
}

export default all([
  takeLatest('@batch/READ_QRCODE_REQUEST', readQrcode),
  takeLatest('@batch/DELETE_BATCH_REQUEST', deleteBatch),
  takeLatest('@batch/EDIT_BATCH_REQUEST', editBatch),
  takeLatest('@batch/EDIT_BATCH_TRANSFORMER_REQUEST', editBatchTransformer),
]);
