import { takeLatest, call, put, all } from 'redux-saga/effects';
import api from '../../../services/api';
import * as actions from './actions';

export function* readQrcode({
  payload,
}: {
  payload: { qrcode: string };
  type: string;
}) {
  try {
    const headerParams = {
      user_id: '5',
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

export default all([takeLatest('@batch/READ_QRCODE_REQUEST', readQrcode)]);
