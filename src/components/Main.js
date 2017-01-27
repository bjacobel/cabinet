import React, { Component } from 'react';
import { connect } from 'react-redux';

import { data, footer } from '../stylesheets/main.css';
import { getCabinetAsync } from '../actions/cabinet';
import { updateFilterTermAsync } from '../actions/filtering';
import Header from './Header';
import TableWrapper from './TableWrapper';
import FilterInput from './FilterInput';

const mapStateToProps = state => ({
  votes: state.votes,
  voteRecords: state.voteRecords,
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
        <FilterInput updateFilter={ updateFilterTermAsync } />
        <TableWrapper votes={ votes } senators={ senators } filteredVoteRecords={ filteredVoteRecords } />
        <p className={ footer }>
          <span>Data via <a href="https://www.govtrack.us">GovTrack</a>. </span>
          <span>Code on <a href="https://github.com/bjacobel/cabinet">GitHub</a>, PRs welcome. </span>
          <span>By <a href="https://twitter.com/bjacobel">@bjacobel</a></span>
        </p>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);
