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

const mapStateToProps = (state) => ({
  votes: state.votes,
  voteRecords: state.voteRecords,
  senators: state.senators,
  voteTotals: state.voteTotals,
  filterTerm: state.filterTerm,
});

const mapDispatchToProps = {
  getCabinetAsync,
  updateFilterTermAsync,
};

class Main extends Component {
  componentDidMount() {
    if (!this.props.votes.length) {
      this.props.getCabinetAsync();
    }
  }

  render() {
    const {
      votes,
      voteRecords,
      senators,
      voteTotals,
      filterTerm,
      updateFilterTermAsync, // eslint-disable-line no-shadow
    } = this.props;
    const { party } = this.props.match.params;
    const partyRegexp = new RegExp(party || '.+', 'i');
    const filterRegexp = new RegExp(filterTerm, 'i');

    const filteredSenators = senators
      .filter((senator) => senator.party.match(partyRegexp))
      .filter(
        (senator) =>
          senator.name.match(filterRegexp) || senator.state.match(filterRegexp) || senator.stateFull.match(filterRegexp)
      );

    return (
      <div className={data}>
        <Header />
        <TableWrapper votes={votes} senators={filteredSenators} voteRecords={voteRecords} voteTotals={voteTotals}>
          <FilterByParty />
          <FilterBySearch updateFilter={updateFilterTermAsync} />
        </TableWrapper>
        <News />
        <p className={footer}>
          <span>
            <span>Data via </span>
            <a href="https://www.govtrack.us">GovTrack</a>
            <span> and </span>
            <a href="https://www.propublica.org/">ProPublica</a>.
          </span>
          <br />
          <span>
            <span>Code on </span>
            <a href="https://github.com/bjacobel/cabinet">GitHub</a>, PRs welcome.
          </span>
          <br />
          <span>
            <span>Created by </span>
            <a href="https://twitter.com/bjacobel">@bjacobel</a>.
          </span>
          <br />
          <span>Ringing Phone icon By </span>
          <a href="https://thenounproject.com/mockturtle/">Sergey Demushkin</a>
          <span> from the </span>
          <a href="https://thenounproject.com/">Noun Project</a>.
        </p>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
