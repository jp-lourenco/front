import { combineReducers } from 'redux';

import batch from './batch/reducer';
import production from './production/reducer';

export default combineReducers({
  batch,
  production,
});
