import {
  loadingStarted,
  loadingEnded,
} from './loading';
import {
  getVotes,
  getVoteRecords,
  getSenators,
} from '../services/api';

export const GET_VOTES_FAILED = 'GET_VOTES_FAILED';
export const GET_VOTES_SUCCEEDED = 'GET_VOTES_SUCCEEDED';
export const GET_VOTE_RECORDS_FAILED = 'GET_VOTE_RECORDS_FAILED';
export const GET_VOTE_RECORDS_SUCCEEDED = 'GET_VOTE_RECORDS_SUCCEEDED';
export const GET_SENATORS_FAILED = 'GET_SENATORS_FAILED';
export const GET_SENATORS_SUCCEEDED = 'GET_SENATORS_SUCCEEDED';

export const getVotesSucceeded = (votes) => {
  return { type: GET_VOTES_SUCCEEDED, payload: { votes } };
};

export const getVotesFailed = (err) => {
  return { type: GET_VOTES_FAILED, payload: { errors: [err] } };
};

export const getVoteRecordsSucceeded = (voteRecords) => {
  return { type: GET_VOTE_RECORDS_SUCCEEDED, payload: { voteRecords } };
};

export const getVoteRecordsFailed = (err) => {
  return { type: GET_VOTE_RECORDS_FAILED, payload: { errors: [err] } };
};

export const getSenatorsSucceeded = (senators) => {
  return { type: GET_SENATORS_SUCCEEDED, payload: { senators } };
};

export const getSenatorsFailed = (err) => {
  return { type: GET_SENATORS_FAILED, payload: { errors: [err] } };
};

export const getCabinetAsync = () => {
  return (dispatch) => {
    dispatch(loadingStarted());

    return Promise.all([
      getVotes(),
      getSenators(),
    ]).then(([votes, senators]) => {
      dispatch(getSenatorsSucceeded(senators));
      dispatch(getVotesSucceeded(votes));

      return Promise.all(votes.map((vote) => {
        return getVoteRecords(vote.id)
          .then(voteRecords => dispatch(getVoteRecordsSucceeded(voteRecords)))
          .catch(err => dispatch(getVoteRecordsFailed(err)));
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
