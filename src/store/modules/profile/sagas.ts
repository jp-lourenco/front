import { message } from 'antd';
import { takeLatest, call, put, all, select } from 'redux-saga/effects';
import api from '../../../services/api';
import * as actions from './actions';
import * as actionsAuth from '../auth/actions';

export function* getMyProfileRequest() {
  try {
    const token = localStorage.getItem('token');

    const headerParams = {
      Authorization: 'Bearer ' + token,
    };

    const { data } = yield call(api.get, 'me', {
      headers: headerParams,
    });

    console.log(data);

    yield put(actions.getMyProfileSuccess({ profile: data }));
  } catch (err) {
    if (err.response.status === 403 || err.response.status === 401) {
      yield put(actionsAuth.logoutRequest());
    }
    yield put(actions.getMyProfileFailure());
  }
}

export function* editProfile() {
  try {
    const { name } = yield select(({ profile }) => profile);

    const token = localStorage.getItem('token');

    const headerParams = {
      Authorization: 'Bearer ' + token,
    };

    yield call(
      api.put,
      'me',
      {
        name: name,
      },
      { headers: headerParams },
    );

    yield put(actions.editProfileSuccess());
    message.success('Perfil editado com sucesso!');
  } catch (err) {
    if (err.response.status === 403 || err.response.status === 401) {
      yield put(actionsAuth.logoutRequest());
    }
    yield put(actions.editProfileFailure());
    message.error('Alguma coisa deu errada!');
  }
}

export function* updatePassword() {
  try {
    const { password, newPassword } = yield select(({ profile }) => profile);

    const token = localStorage.getItem('token');

    const headerParams = {
      Authorization: 'Bearer ' + token,
    };

    yield call(
      api.put,
      'me/update-password',
      {
        password: password,
        new_password: newPassword,
      },
      { headers: headerParams },
    );

    yield put(actions.updatePasswordSuccess());
    message.success('Palavra-passe editada com sucesso!');
    yield put(actionsAuth.logoutRequest());
  } catch (err) {
    if (err.response.status === 403) {
      yield put(actionsAuth.logoutRequest());
    }
    yield put(actions.updatePasswordFailure());
    message.error(err.response.data.message);
  }
}

export default all([
  takeLatest('@profile/GET_MY_PROFILE_REQUEST', getMyProfileRequest),
  takeLatest('@profile/EDIT_PROFILE_REQUEST', editProfile),
  takeLatest('@profile/UPDATE_PASSWORD_REQUEST', updatePassword),
]);
