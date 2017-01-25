import { GET_VOTERS_SUCCEEDED } from '../actions/cabinet';

export default (state = {}, action) => {
  switch (action.type) {
  case GET_VOTERS_SUCCEEDED:
    return {
      ...state,
      ...action.payload.voters.reduce((red, cur) => {
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
