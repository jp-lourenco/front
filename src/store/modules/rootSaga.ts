import { all } from 'redux-saga/effects';
import auth from './auth/sagas';
import batch from './batch/sagas';
import production from './production/sagas';
import employee from './employee/sagas';
import profile from './profile/sagas';

export default function* rootSaga(): any {
  return yield all([batch, production, auth, employee, profile]);
}
