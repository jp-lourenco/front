import { combineReducers } from 'redux';

import auth from './auth/reducer';
import batch from './batch/reducer';
import production from './production/reducer';
import employee from './employee/reducer';
import profile from './profile/reducer';

export default combineReducers({
  auth,
  batch,
  production,
  employee,
  profile,
});
