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
    const {
      companyEmail,
      companyName,
      companyAddress,
      companyZipCode,
      companyNif,
      companyPhone,
      companyFunction,
    } = yield select(({ auth }) => auth);

    if (companyPhone == '') {
      const { data } = yield call(api.post, 'companies', {
        email: companyEmail,
        name: companyName,
        company_function: companyFunction,
        address: companyAddress,
        zip_code: companyZipCode,
        nif: companyNif,
      });
    } else {
      const { data } = yield call(api.post, 'companies', {
        email: companyEmail,
        name: companyName,
        company_function: companyFunction,
        address: companyAddress,
        zip_code: companyZipCode,
        nif: companyNif,
        phone: companyPhone,
      });
    }
    yield put(actions.signUpSuccess());
  } catch (err) {
    yield put(actions.signUpFailure({ msg: err.response.data.msg }));
  }
}

export function* forgotPassword() {
  try {
    const { emailForgotPassword } = yield select(({ auth }) => auth);
    const { data } = yield call(api.post, 'forgot-password', {
      email: emailForgotPassword,
    });

    yield put(actions.forgotPasswordSuccess());
  } catch (err) {
    message.error('Email não encontrado');
    yield put(actions.forgotPasswordFailure());
  }
}

export function* verifyCode() {
  try {
    const { emailForgotPassword, code } = yield select(({ auth }) => auth);

    console.log(emailForgotPassword, code);
    const { data } = yield call(api.post, 'verify-code', {
      email: emailForgotPassword,
      code: code,
    });

    yield put(actions.verifyCodeSuccess());
  } catch (err) {
    message.error('Código de Verificação Inválido');
    yield put(actions.verifyCodeFailure());
  }
}

export function* changePassword() {
  try {
    const { emailForgotPassword, code, newPassword } = yield select(
      ({ auth }) => auth,
    );

    console.log(emailForgotPassword, code);
    const { data } = yield call(api.post, 'change-password', {
      email: emailForgotPassword,
      code: code,
      new_password: newPassword,
    });

    yield put(actions.changePasswordSuccess());
  } catch (err) {
    message.error(err.response.data.msg);
    yield put(actions.changePasswordFailure());
  }
}

export default all([
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/FORGET_PASSWORD_REQUEST', forgotPassword),
  takeLatest('@auth/VERIFY_CODE_REQUEST', verifyCode),
  takeLatest('@auth/CHANGE_PASSWORD_REQUEST', changePassword),
]);
