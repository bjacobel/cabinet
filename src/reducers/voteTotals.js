import {
  GET_VOTES_SUCCEEDED,
  GET_VOTE_RECORDS_SUCCEEDED,
} from '../actions/cabinet';

export default (state = {}, action) => {
  switch (action.type) {
  case GET_VOTES_SUCCEEDED:
    return { total: action.payload.votes.length };
  case GET_VOTE_RECORDS_SUCCEEDED:  // eslint-disable-line no-case-declarations
    const stateCopy = { ...state };
    action.payload.voteRecords.forEach((vote) => {
      if (vote.value === 'Yea') {
        if (stateCopy[vote.name]) {
          stateCopy[vote.name] += 1;
        } else {
          stateCopy[vote.name] = 1;
        }
      }
    });

    return stateCopy;
  default:
    return state;
  }
};
