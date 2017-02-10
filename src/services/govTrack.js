import fetch from './fetch';
import states from './states.json';

// Get the list of voters
export const getSenators = () => {
  return fetch('https://www.govtrack.us/api/v2/role?current=true&senator_class__in=class1%7Cclass2%7Cclass3&limit=101')
    .then(body => body.json())
    .then(data => data.objects)
    .then((voters) => {
      return voters.map((voter) => {
        const { party, state, website, phone } = voter;
        const { name, lastname, id, link } = voter.person;

        return {
          name,
          lastName: lastname,
          id,
          party,
          phone,
          state,
          link: website || link,
          stateFull: states[state],
        };
      })
      .sort((a, b) => (a.lastName > b.lastName ? 1 : -1));
    });
};

// Get the list of votes held
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

// For a given vote, get how everyone voted on it
export const getVoteRecords = (voteId) => {
  return fetch(`https://www.govtrack.us/api/v2/vote_voter?vote=${voteId}&limit=101`)
    .then(body => body.json())
    .then(data => data.objects)
    .then((voters) => {
      return voters.map((voter) => {
        const { value } = voter.option;
        const { id } = voter.person;

        if (id === 400315) {
          // Mike Pence ruins everything
          return null;
        }

        return {
          value,
          id,
          voteId,
          name: voter.person.name,
        };
      })
      .filter(x => x !== null);
    });
};
