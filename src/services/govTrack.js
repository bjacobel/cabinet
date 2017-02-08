import fetch from './fetch';
import states from './states.json';

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
    .then((voters) => {
      return voters.map((voter) => {
        const { value } = voter.option;
        const { name, lastname, id, link } = voter.person;
        const { party, state, website, phone, extra } = voter.person_role;
        const { contact_form } = extra;

        if (id === 400315) {
          // Mike Pence ruins everything
          return null;
        }

        return {
          name,
          lastName: lastname,
          value,
          id,
          party,
          phone,
          voteId,
          state,
          link: contact_form || website || link, // eslint-disable-line camelcase
          stateFull: states[state],
        };
      })
      .filter(x => x !== null)
      .sort((a, b) => (a.lastName < b.lastName ? 1 : -1));
    })
    .then((voters) => {
      // Patch over the GovTrack bug where DeVos vote shows Pence but omits Masto
      // Masto needs to be inserted at index 78 bc my stupid logic depends on array indexes being constant
      if (!voters.find(x => x.id === 412681)) {
        voters.splice(78, 0, {
          value: 'Nay',
          id: 412681,
          lastName: 'Cortez Masto',
          link: 'https://www.cortezmasto.senate.gov/content/contact-senator',
          name: 'Sen. Catherine Cortez Masto [D-NV]',
          party: 'Democrat',
          phone: '202-224-3542',
          state: 'NV',
          stateFull: 'Nevada',
          voteId: 118997,
        });
      }

      return voters;
    });
};
