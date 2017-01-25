import { GET_VOTES_SUCCEEDED } from '../actions/cabinet';

export default (state = {}, action) => {
  switch (action.type) {
  case GET_VOTES_SUCCEEDED:
    return action.payload.votes.reduce((prev, vote) => ({ ...prev, [vote.id]: vote }), {});
  default:
    return state;
  }
};
