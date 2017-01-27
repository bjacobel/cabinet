import { combineReducers } from 'redux';

import votes from './votes';
import voteRecords from './voteRecords';
import errors from './errors';
import loading from './loading';

export default combineReducers({
  loading,
  votes,
  voteRecords,
  errors,
});
