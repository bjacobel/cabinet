import { combineReducers } from 'redux';

import votes from './votes';
import voteRecords from './voteRecords';
import senators from './senators';
import voteTotals from './voteTotals';
import errors from './errors';
import loading from './loading';
import filterTerm from './filterTerm';

export default combineReducers({
  loading,
  votes,
  voteRecords,
  senators,
  voteTotals,
  errors,
  filterTerm,
});
