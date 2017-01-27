import {
  loadingStarted,
  loadingEnded,
} from './loading';
import {
  getVotes,
  getVoteRecords,
} from '../services/govTrack';

export const GET_VOTES_FAILED = 'GET_VOTES_FAILED';
export const GET_VOTES_SUCCEEDED = 'GET_VOTES_SUCCEEDED';
export const GET_VOTE_RECORDS_FAILED = 'GET_VOTE_RECORDS_FAILED';
export const GET_VOTE_RECORDS_SUCCEEDED = 'GET_VOTE_RECORDS_SUCCEEDED';

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

export const getCabinetAsync = () => {
  return (dispatch) => {
    dispatch(loadingStarted());

    return getVotes()
      .then((votes) => {
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
