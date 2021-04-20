import { message } from 'antd';
import { takeLatest, call, select, all, put } from 'redux-saga/effects';
import api from '../../../services/api';
import * as actions from './actions';

export function* signIn() {
  try {
    const { email, password } = yield select(({ auth }) => auth);

    const { data } = yield call(api.post, 'login', {
      email: email,
      password: password,
    });
    yield put(actions.signInSuccess({ token: data['access_token'] }));
  } catch (err) {
    yield put(actions.signInFailure());
    message.error('O email ou senha que você digitou está incorreto!');
  }
}

export function* signUp() {
  try {
    const { emailCompany, companyName, companyFunction } = yield select(
      ({ auth }) => auth,
    );
    const { data } = yield call(api.post, 'companies', {
      email: emailCompany,
      name: companyName,
      company_function: companyFunction,
    });

    yield put(actions.signUpSuccess());
  } catch (err) {
    yield put(actions.signUpFailure({ message: err.response.data.message }));
  }
}

export function* resetPassword() {
  try {
    const { emailResetPassword } = yield select(({ auth }) => auth);
    const { data } = yield call(api.post, 'reset-password', {
      email: emailResetPassword,
    });

    yield put(actions.resetPasswordSuccess());
  } catch (err) {
    yield put(
      actions.resetPasswordFailure({ message: err.response.data.message }),
    );
  }
}

export default all([
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/RESET_PASSWORD_REQUEST', resetPassword),
]);
