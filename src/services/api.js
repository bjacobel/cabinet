import fetch from './fetch';
import states from './states.json';
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

// Get the list of voters
export const getSenators = () => {
  return fetch(`${API_ROOT}/senators`)
    .then(body => body.json())
    .then(data => data.results[0].members)
    .then((senators) => {
      return senators.map((senator) => {
        const { id, last_name, first_name, url, party, state } = senator;

        return {
          name: `Sen. ${first_name} ${last_name}`,  // eslint-disable-line camelcase
          lastName: last_name,
          id,
          party: partyFromShort(party),
          phone: '555-555-5555',
          state,
          link: url,
          stateFull: states[state],
        };
      })
      .sort((a, b) => (a.lastName > b.lastName ? 1 : -1));
    });
};

// Get the list of votes held
export const getVotes = () => {
  return fetch(`${API_ROOT}/nominations`)
    .then(body => body.json())
    .then(data => data.results[0].votes)
    .then(votes => votes.map((vote) => {
      const { roll_call, result, description } = vote;
      let [_, name, _2, _3, position] = description.match(/([\w\ \.]+), of (\w+(\ \w+)?), to be ([\w\ \,]+);?/);  // eslint-disable-line

      if (position === 'Representative of the United States of America to the Sessions of the General Assembly of the United Nations during her tenure of service as Representative of the United States of America to the United Nations') {  // eslint-disable-line max-len
        position = 'Ambassador to the United Nations';
      } else if (position === 'Administrator of the Small Business Administration') {
        position = 'Small Business Administration';
      } else if (position === 'Director of the Office of Management and Budget') {
        position = 'Office of Management and Budget';
      } else if (position === 'Administrator of the Environmental Protection Agency') {
        position = 'Environmental Protection Agency';
      }

      console.log(name, position);

      return {
        id: roll_call,
        question: `${name} (${position})`,
        result,
      };
    }));
};

// For a given vote, get how everyone voted on it
export const getVoteRecords = (voteId) => {
  return fetch(`${API_ROOT}/votes?vote=${voteId}`)
    .then(body => body.json())
    .then(data => data.results.votes.vote.positions)
    .then((voters) => {
      return voters.map((voter) => {
        const { member_id, vote_position } = voter;

        return {
          value: vote_position,
          id: member_id,
          voteId,
        };
      });
    });
};
