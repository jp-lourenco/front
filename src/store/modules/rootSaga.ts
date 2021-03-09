import { all } from 'redux-saga/effects';
import batch from './batch/sagas';
import production from './production/sagas';

export default function* rootSaga(): any {
  return yield all([batch, production]);
}
