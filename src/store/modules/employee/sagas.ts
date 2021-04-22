import { message } from 'antd';
import { takeLatest, call, put, all, select } from 'redux-saga/effects';
import api from '../../../services/api';
import * as actions from './actions';
import * as actionsAuth from '../auth/actions';

export function* createEmployee() {
  try {
    const token = localStorage.getItem('token');

    const headerParams = {
      Authorization: 'Bearer ' + token,
    };

    const { email, name, role } = yield select(({ employee }) => employee);

    yield call(
      api.post,
      'companies/employees',
      {
        email: email,
        name: name,
        role: role,
      },
      { headers: headerParams },
    );

    yield put(actions.createEmployeeSuccess());
    yield put(actions.getEmployeesRequest());
  } catch (err) {
    if (err.response.status === 403 || err.response.status === 401) {
      yield put(actionsAuth.logoutRequest());
    }
    yield put(actions.createEmployeeFailure());
  }
}

export function* getEmployeesRequest() {
  try {
    const token = localStorage.getItem('token');

    const headerParams = {
      Authorization: 'Bearer ' + token,
    };

    const { data } = yield call(api.get, 'companies/employees', {
      headers: headerParams,
    });

    yield put(actions.getEmployeesSuccess({ employees: data }));
  } catch (err) {
    if (err.response.status === 403 || err.response.status === 401) {
      yield put(actionsAuth.logoutRequest());
    }
    yield put(actions.getEmployeesFailure());
  }
}

export default all([
  takeLatest('@employee/GET_EMPLOYEES_REQUEST', getEmployeesRequest),
  takeLatest('@employee/CREATE_EMPLOYEE_REQUEST', createEmployee),
]);
