import fetch from './fetch';

export const getVotes = () => {
  return fetch('https://www.govtrack.us/api/v2/vote/?congress=115&chamber=senate&session=2017')
    .then(body => body.json())
    .then(data => data.objects)
    .then(votes => votes.filter(vote => vote.category === 'nomination'))
    .then(votes => votes.map((vote) => {
      const { id, result, question } = vote;
      let [_, name, position] = question.match(/PN\d\d: (.+), .+ to be ([\w\ ]+)/);  // eslint-disable-line

      if (position === 'the Representative of the United States of America to the United Nations') {
        position = 'Ambassador to the United Nations';
      }

      return {
        id,
        question: `${name} (${position})`,
        result,
      };
    }));
};

export const getVoteRecords = (voteId) => {
  return fetch(`https://www.govtrack.us/api/v2/vote_voter?vote=${voteId}`)
    .then(body => body.json())
    .then(data => data.objects)
    .then(voters => voters.map((voter) => {
      const { value } = voter.option;
      const { name, link, id } = voter.person;
      const { party } = voter.person_role;
      return { name, link, value, id, party, voteId };
    }));
};
