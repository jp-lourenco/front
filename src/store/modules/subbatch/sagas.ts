import { message } from 'antd';
import { takeLatest, call, put, all, select } from 'redux-saga/effects';
import api from '../../../services/api';
import * as actions from './actions';
import * as actionsAuth from '../auth/actions';

export function* createSubBatch() {
  try {
    const token = localStorage.getItem('token');

    const headerParams = {
      Authorization: 'Bearer ' + token,
    };

    const {
      subbatch_code,
      product_name,
      transformation_start,
      transformation_end,
      transformation_description,
      batch_code,
      amount_transformed,
      batch_codes,
    } = yield select(({ subbatch }) => subbatch);

    const batch = {
      batch_code: batch_code,
      amount_transformed: amount_transformed,
    };

    let batchs_father = [batch];

    if (batch_codes.length > 0) {
      batch_codes.forEach((batch_code: any) => {
        batchs_father.push(batch_code);
      });
    }

    yield call(
      api.post,
      'subbatchs',
      {
        subbatch_code: subbatch_code,
        product_name: product_name,
        transformation_start: transformation_start,
        transformation_end: transformation_end,
        transformation_description: transformation_description,
        batchs_father: batchs_father,
      },
      { headers: headerParams },
    );

    yield put(actions.createSubBatchSuccess());
    yield put(actions.getSubBatchsByUserRequest());
  } catch (err: any) {
    if (err.response.status === 403 || err.response.status === 401) {
      yield put(actionsAuth.logoutRequest());
    }
    yield put(actions.createSubBatchFailure());
  }
}

export function* editSubBatch({
  payload,
}: {
  payload: { _id: string };
  type: string;
}) {
  try {
    const {
      product_name,
      transformation_start,
      transformation_end,
      transformation_description,
      gtin,
      sscc,
      expiration_date,
    } = yield select(({ subbatch }) => subbatch);

    const token = localStorage.getItem('token');

    const headerParams = {
      Authorization: 'Bearer ' + token,
    };

    yield call(
      api.put,
      'subbatchs/' + payload._id,
      {
        product_name: product_name,
        transformation_start: transformation_start,
        transformation_end: transformation_end,
        transformation_description: transformation_description,
        gtin: gtin,
        sscc: sscc,
        expiration_date: expiration_date,
      },
      { headers: headerParams },
    );

    yield put(actions.editSubBatchSuccess());
    yield put(actions.getSubBatchsByUserRequest());
  } catch (err: any) {
    if (err.response.status === 403 || err.response.status === 401) {
      yield put(actionsAuth.logoutRequest());
    }
    yield put(actions.editSubBatchFailure());
  }
}

export function* getSubBatchsByUser() {
  try {
    const token = localStorage.getItem('token');

    const headerParams = {
      Authorization: 'Bearer ' + token,
    };

    const { data } = yield call(api.get, 'subbatchs', {
      headers: headerParams,
    });

    console.log(data);
    yield put(actions.getSubBatchsByUserSuccess({ subbatchs: data }));
  } catch (err: any) {
    if (err.response.status === 403 || err.response.status === 401) {
      yield put(actionsAuth.logoutRequest());
    }
    yield put(actions.getSubBatchsByUserFailure());
  }
}

export function* deleteSubBatch({
  payload,
}: {
  payload: { subbatch_id: string };
  type: string;
}) {
  try {
    const token = localStorage.getItem('token');

    const headerParams = {
      Authorization: 'Bearer ' + token,
    };

    const { data } = yield call(
      api.delete,
      'subbatchs/' + payload.subbatch_id,
      {
        headers: headerParams,
      },
    );
    yield put(actions.deleteSubBatchSuccess());
    yield put(actions.getSubBatchsByUserRequest());
    message.success('Sub lote deletado!');
  } catch (err: any) {
    if (err.response.status === 403 || err.response.status === 401) {
      yield put(actionsAuth.logoutRequest());
    }
    yield put(actions.deleteSubBatchFailure());
    message.error('Alguma coisa deu errada!');
  }
}

export default all([
  takeLatest('@subbatch/CREATE_SUB_BATCH_REQUEST', createSubBatch),
  takeLatest('@subbatch/EDIT_SUB_BATCH_REQUEST', editSubBatch),
  takeLatest('@subbatch/GET_SUB_BATCHS_BY_USER_REQUEST', getSubBatchsByUser),
  takeLatest('@subbatch/DELETE_SUB_BATCH_REQUEST', deleteSubBatch),
]);
