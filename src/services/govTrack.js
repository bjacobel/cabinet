import fetch from './fetch';

export const getVotes = () => {
  return fetch('https://www.govtrack.us/api/v2/vote/?congress=115&chamber=senate&session=2017')
    .then(body => body.json())
    .then(data => data.objects)
    .then(votes => votes.filter(vote => vote.category === 'nomination'))
    .then(votes => votes.map((vote) => {
      let { question } = vote;
      const { id, result } = vote;
      question = question.match(/PN\d\d: (.+)/)[1].split(', of')[0];
      return { id, question, result };
    }));
};

export const getVoters = (voteId) => {
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
