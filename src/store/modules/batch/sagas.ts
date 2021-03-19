import { message } from 'antd';
import { takeLatest, call, put, all } from 'redux-saga/effects';
import api from '../../../services/api';
import * as actions from './actions';
import * as actionsProductions from '../production/actions';

export function* readQrcode({
  payload,
}: {
  payload: { qrcode: string };
  type: string;
}) {
  try {
    const headerParams = {
      user_id: '1',
    };

    const { data } = yield call(
      api.post,
      'productions/batchs/read-qrcode',
      {
        batch_id: payload.qrcode,
      },
      { headers: headerParams },
    );
    console.log(data);
    yield put(actions.readQrcodeSuccess());
  } catch (err) {
    yield put(
      actions.readQrcodeFailure({ message: err.response.data.message }),
    );
  }
}

export function* deleteBatch({
  payload,
}: {
  payload: { batch_id: string };
  type: string;
}) {
  try {
    const headerParams = {
      user_id: '1',
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
    yield put(actions.deleteBatchFailure());
    message.error('Alguma coisa deu errada!');
  }
}

export default all([
  takeLatest('@batch/READ_QRCODE_REQUEST', readQrcode),
  takeLatest('@batch/DELETE_BATCH_REQUEST', deleteBatch),
]);
