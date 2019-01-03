/* eslint-disable camelcase */

import states from './states.json';
import phones from './phones.json';
import { API_ROOT } from '../constants';

const partyFromShort = (shortParty) => {
  switch (shortParty) {
    case 'R':
      return 'Republican';
    case 'D':
      return 'Democrat';
    default:
      return 'Independent';
  }
};

const fetchValidate = (url) =>
  fetch(url).then((body) => {
    if (!body.ok) {
      return Promise.reject(new Error(`Request to ${url} failed with code ${body.status}`));
    }
    return body;
  });

// Get the list of voters
export const getSenators = () =>
  fetchValidate(`${API_ROOT}/115/senate/members.json`)
    .then((body) => body.json())
    .then((data) => data.results[0].members)
    .then((senators) =>
      senators
        .map((senator) => {
          const { id, last_name, first_name, url, party, state } = senator;

          return {
            name: `Sen. ${first_name} ${last_name}`, // eslint-disable-line camelcase
            lastName: last_name,
            id,
            party: partyFromShort(party),
            phone: phones[id],
            state,
            link: url,
            stateFull: states[state],
          };
        })
        .sort((a, b) => (a.lastName > b.lastName ? 1 : -1))
    );

// Get the list of votes held
export const getVotes = () =>
  fetchValidate(`${API_ROOT}/115/nominations.json`)
    .then((body) => body.json())
    .then((data) => data.results[0].votes)
    .then((votes) =>
      votes.map((vote) => {
        const { roll_call, result, description } = vote;
        let [_, name] = description.match(/([\w\ \.,]+), (?:of|in).*$/);  // eslint-disable-line

        return {
          id: roll_call,
          name,
          description,
          result,
        };
      })
    );

// For a given vote, get how everyone voted on it
export const getVoteRecords = (voteId) =>
  fetchValidate(`${API_ROOT}/115/senate/sessions/1/votes/${voteId}.json`)
    .then((body) => body.json())
    .then((data) => data.results.votes.vote.positions)
    .then((voters) =>
      voters.map((voter) => {
        const { member_id, vote_position } = voter;

        return {
          value: vote_position,
          id: member_id,
          voteId,
        };
      })
    );
