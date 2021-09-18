import { combineReducers } from 'redux';

import auth from './auth/reducer';
import batch from './batch/reducer';
import production from './production/reducer';
import subbatch from './subbatch/reducer';
import employee from './employee/reducer';
import sensor from './sensor/reducer';
import profile from './profile/reducer';
import company from './company/reducer';
import food from './food/reducer';

export default combineReducers({
  auth,
  batch,
  production,
  subbatch,
  employee,
  profile,
  sensor,
  company,
  food,
});
