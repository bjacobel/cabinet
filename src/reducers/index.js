import { combineReducers } from 'redux';

import votes from './votes';
import voters from './voters';
import errors from './errors';
import loading from './loading';

export default combineReducers({
  loading,
  votes,
  voters,
  errors,
});
