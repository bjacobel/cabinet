import {
  loadingStarted,
  loadingEnded,
} from './loading';
import {
  getVotes,
  getVoters,
} from '../services/govTrack';

export const GET_VOTES_FAILED = 'GET_VOTES_FAILED';
export const GET_VOTES_SUCCEEDED = 'GET_VOTES_SUCCEEDED';
export const GET_VOTERS_FAILED = 'GET_VOTERS_FAILED';
export const GET_VOTERS_SUCCEEDED = 'GET_VOTERS_SUCCEEDED';

export const getVotesSucceeded = (votes) => {
  return { type: GET_VOTES_SUCCEEDED, payload: { votes } };
};

export const getVotesFailed = (err) => {
  return { type: GET_VOTES_FAILED, payload: { errors: [err] } };
};

export const getVotersSucceeded = (voters) => {
  return { type: GET_VOTERS_SUCCEEDED, payload: { voters } };
};

export const getVotersFailed = (err) => {
  return { type: GET_VOTERS_FAILED, payload: { errors: [err] } };
};

export const getCabinetAsync = () => {
  return (dispatch) => {
    dispatch(loadingStarted());

    return getVotes()
      .then((votes) => {
        dispatch(getVotesSucceeded(votes));

        return Promise.all(votes.map((vote) => {
          return getVoters(vote.id)
            .then(voters => dispatch(getVotersSucceeded(voters)))
            .catch(err => dispatch(getVotersFailed(err)));
        }));
      })
      .then(() => {
        dispatch(loadingEnded());
      })
      .catch((err) => {
        dispatch(loadingEnded());
        dispatch(getVotesFailed(err));
      });
  };
};
