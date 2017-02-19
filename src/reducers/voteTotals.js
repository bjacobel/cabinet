import {
  GET_VOTE_RECORDS_SUCCEEDED,
} from '../actions/cabinet';

export default (state = {}, action) => {
  switch (action.type) {
  case GET_VOTE_RECORDS_SUCCEEDED:  // eslint-disable-line no-case-declarations
    const stateCopy = { ...state };
    action.payload.voteRecords.forEach((vote) => {
      if (!stateCopy[vote.id]) {
        stateCopy[vote.id] = {
          total: 0,
          yeas: 0,
        };
      }

      if (vote.value) {
        if (stateCopy[vote.id].total) {
          stateCopy[vote.id].total += 1;
        } else {
          stateCopy[vote.id] = {
            ...stateCopy[vote.id],
            total: 1,
          };
        }
      }

      if (vote.value === 'Yes') {
        if (stateCopy[vote.id].yeas) {
          stateCopy[vote.id].yeas += 1;
        } else {
          stateCopy[vote.id] = {
            ...stateCopy[vote.id],
            yeas: 1,
          };
        }
      }
    });

    return stateCopy;
  default:
    return state;
  }
};
