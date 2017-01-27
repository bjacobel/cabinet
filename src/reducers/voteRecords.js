import { GET_VOTE_RECORDS_SUCCEEDED } from '../actions/cabinet';

export default (state = {}, action) => {
  switch (action.type) {
  case GET_VOTE_RECORDS_SUCCEEDED:
    return {
      ...state,
      ...action.payload.voteRecords.reduce((red, cur) => {
        let newRed = red;
        if (red[cur.voteId]) {
          newRed[cur.voteId] = [cur, ...red[cur.voteId]];
        } else {
          newRed = {
            [cur.voteId]: [cur],
            ...red,
          };
        }

        return newRed;
      },
      {}),
    };
  default:
    return state;
  }
};
