import React, { Component } from 'react';
import { connect } from 'react-redux';

import { data, footer } from '../stylesheets/main.css';
import { getCabinetAsync } from '../actions/cabinet';
import { updateFilterTermAsync } from '../actions/filtering';
import Header from './Header';
import TableWrapper from './TableWrapper';
import FilterBySearch from './FilterBySearch';
import FilterByParty from './FilterByParty';
import News from './News';

const mapStateToProps = state => ({
  votes: state.votes,
  voteRecords: state.voteRecords,
  voteTotals: state.voteTotals,
  filterTerm: state.filterTerm,
});

const mapDispatchToProps = {
  getCabinetAsync,
  updateFilterTermAsync,
};

class Main extends Component {
  componentWillMount() {
    this.props.getCabinetAsync();
  }

  render() {
    const {
      votes,
      voteRecords,
      voteTotals,
      filterTerm,
      updateFilterTermAsync, // eslint-disable-line no-shadow
    } = this.props;
    const { party } = this.props.params;
    const partyRegexp = new RegExp(party || '.+', 'i');
    const filterRegexp = new RegExp(filterTerm, 'i');

    const filteredVoteRecords = {};
    Object.entries(voteRecords).forEach(([voteId, votersForVote]) => {
      filteredVoteRecords[voteId] = votersForVote
        .filter(voter => voter.party.match(partyRegexp))
        .filter((voter) => {
          return voter.name.match(filterRegexp) ||
            voter.state.match(filterRegexp) ||
            voter.stateFull.match(filterRegexp);
        });
    });

    const senators = Object.values(filteredVoteRecords)[0] || [];

    return (
      <div className={ data }>
        <Header />
        <TableWrapper
          votes={ votes }
          senators={ senators }
          filteredVoteRecords={ filteredVoteRecords }
          voteTotals={ voteTotals }
        >
          <FilterByParty />
          <FilterBySearch updateFilter={ updateFilterTermAsync } />
        </TableWrapper>
        <News />
        <p className={ footer }>
          <span>Data via <a href="https://www.govtrack.us">GovTrack</a>. </span>
          <span>Code on <a href="https://github.com/bjacobel/cabinet">GitHub</a>, PRs welcome. </span>
          <span>Created by <a href="https://twitter.com/bjacobel">@bjacobel</a>.</span>
          <br />
          <span>Ringing Phone icon By </span>
          <a href="https://thenounproject.com/mockturtle/">Sergey Demushkin</a>
          <span> from the <a href="https://thenounproject.com/">Noun Project</a>.</span>
        </p>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);
