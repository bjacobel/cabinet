import {
  GET_VOTES_FAILED,
  GET_VOTERS_FAILED,
} from '../actions/cabinet';

export default (state = [], action) => {
  switch (action.type) {
  case GET_VOTES_FAILED:
    return [...action.payload.errors, ...state];
  case GET_VOTERS_FAILED:
    return [...action.payload.errors, ...state];
  default:
    return state;
  }
};
