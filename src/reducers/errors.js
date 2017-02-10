import {
  GET_VOTES_FAILED,
  GET_VOTE_RECORDS_FAILED,
  GET_SENATORS_FAILED,
} from '../actions/cabinet';

export default (state = [], action) => {
  switch (action.type) {
  case GET_VOTES_FAILED:
    console.trace(action.payload.errors[0]);
    return [...action.payload.errors, ...state];
  case GET_VOTE_RECORDS_FAILED:
    console.trace(action.payload.errors[0]);
    return [...action.payload.errors, ...state];
  case GET_SENATORS_FAILED:
    console.trace(action.payload.errors[0]);
    return [...action.payload.errors, ...state];
  default:
    return state;
  }
};
