import { takeLatest, call, put, all } from 'redux-saga/effects';
import api from '../../../services/api';
import * as actions from './actions';
import * as actionsAuth from '../auth/actions';

export function* getCompaniesRequest() {
  try {
    const token = localStorage.getItem('token');

    const headerParams = {
      Authorization: 'Bearer ' + token,
    };

    const { data } = yield call(api.get, 'companies', {
      headers: headerParams,
    });

    yield put(actions.getCompaniesSuccess({ companies: data }));
  } catch (err) {
    if (err.response.status === 403 || err.response.status === 401) {
      yield put(actionsAuth.logoutRequest());
    }
    yield put(actions.getCompaniesFailure());
  }
}

export function* approveCompanyRequest({
  payload,
}: {
  payload: { company_id: string };
  type: string;
}) {
  try {
    const token = localStorage.getItem('token');

    const headerParams = {
      Authorization: 'Bearer ' + token,
    };

    const { data } = yield call(
      api.post,
      'companies/' + payload.company_id + '/approve',
      {},
      {
        headers: headerParams,
      },
    );

    yield put(actions.approveCompanySuccess());
    yield put(actions.getCompaniesRequest());
  } catch (err) {
    if (err.response.status === 403 || err.response.status === 401) {
      yield put(actionsAuth.logoutRequest());
    }
    yield put(actions.approveCompanyFailure());
  }
}

export default all([
  takeLatest('@company/GET_COMPANIES_REQUEST', getCompaniesRequest),
  takeLatest('@company/APPROVE_COMPANY_REQUEST', approveCompanyRequest),
]);
