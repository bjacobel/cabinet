import { loadingStarted, loadingEnded } from './loading';
import { getVotes, getVoteRecords, getSenators } from '../services/api';

export const GET_VOTES_FAILED = 'GET_VOTES_FAILED';
export const GET_VOTES_SUCCEEDED = 'GET_VOTES_SUCCEEDED';
export const GET_VOTE_RECORDS_FAILED = 'GET_VOTE_RECORDS_FAILED';
export const GET_VOTE_RECORDS_SUCCEEDED = 'GET_VOTE_RECORDS_SUCCEEDED';
export const GET_SENATORS_FAILED = 'GET_SENATORS_FAILED';
export const GET_SENATORS_SUCCEEDED = 'GET_SENATORS_SUCCEEDED';

export const getVotesSucceeded = (votes) => ({ type: GET_VOTES_SUCCEEDED, payload: { votes } });

export const getVotesFailed = (err) => ({ type: GET_VOTES_FAILED, payload: { errors: [err] } });

export const getVoteRecordsSucceeded = (voteRecords) => ({
  type: GET_VOTE_RECORDS_SUCCEEDED,
  payload: { voteRecords },
});

export const getVoteRecordsFailed = (err) => ({ type: GET_VOTE_RECORDS_FAILED, payload: { errors: [err] } });

export const getSenatorsSucceeded = (senators) => ({ type: GET_SENATORS_SUCCEEDED, payload: { senators } });

export const getSenatorsFailed = (err) => ({ type: GET_SENATORS_FAILED, payload: { errors: [err] } });

export const getCabinetAsync = () => (dispatch, getState) => {
  const state = getState();
  dispatch(loadingStarted());

  return Promise.all([
    getVotes().catch((err) => {
      dispatch(getVotesFailed(err));
      throw err;
    }),
    getSenators().catch((err) => {
      dispatch(getSenatorsFailed(err));
      throw err;
    }),
  ])
    .then(([votes, senators]) => {
      dispatch(getSenatorsSucceeded(senators));
      dispatch(getVotesSucceeded(votes));

      return Promise.all(
        votes.map((vote) => {
          if (!state.voteRecords[vote.id]) {
            return getVoteRecords(vote.id)
              .then((voteRecords) => dispatch(getVoteRecordsSucceeded(voteRecords)))
              .catch((err) => dispatch(getVoteRecordsFailed(err)));
          } else {
            return Promise.resolve();
          }
        })
      ).catch((err) => {
        dispatch(getVotesFailed(err));
      });
    })
    .then(() => {
      dispatch(loadingEnded());
    });
};
