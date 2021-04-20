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
    const { name, password, newPassword } = yield select(
      ({ profile }) => profile,
    );

    const token = localStorage.getItem('token');

    const headerParams = {
      Authorization: 'Bearer ' + token,
    };

    if (newPassword !== '') {
      yield call(
        api.put,
        'me',
        {
          name: name,
          password: password,
          newPassword: newPassword,
        },
        { headers: headerParams },
      );
    } else {
      yield call(
        api.put,
        'me',
        {
          name: name,
          password: password,
        },
        { headers: headerParams },
      );
    }
    yield put(actions.editProfileSuccess());
    yield put(actions.getMyProfileRequest());
    message.success('Perfil editado com sucesso!');
  } catch (err) {
    if (err.response.status === 403 || err.response.status === 401) {
      yield put(actionsAuth.logoutRequest());
    }
    yield put(actions.editProfileFailure());
    message.error('Alguma coisa deu errada!');
  }
}

export default all([
  takeLatest('@profile/GET_MY_PROFILE_REQUEST', getMyProfileRequest),
  takeLatest('@profile/EDIT_PROFILE_REQUEST', editProfile),
]);
