import React, { Component } from 'react';
import { connect } from 'react-redux';

import { data, footer } from '../stylesheets/main.css';
import { getCabinetAsync } from '../actions/cabinet';
import { updateFilterTermAsync } from '../actions/filtering';
import Header from './Header';
import TableWrapper from './TableWrapper';
import FilterBySearch from './FilterBySearch';
import FilterByParty from './FilterByParty';
import { fixed } from '../stylesheets/shared.css';
import { partyFilter } from '../stylesheets/filterByParty.css';
import { filterBox } from '../stylesheets/filterBySearch.css';

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

  componentDidMount() {
    const columnHeaders = document.querySelector('.fixedDataTableRowLayout_rowWrapper');

    document.addEventListener('scroll', () => requestAnimationFrame(() => {
      // this is HACKY as SHIT
      // my kingdom for actually working position: sticky
      const columnHeaderPos = columnHeaders.getBoundingClientRect().top;

      console.log(columnHeaderPos);

      if (columnHeaderPos < 0) { // the top of the column header is scrolled out of the viewport
        columnHeaders.classList.add(fixed);
      } else if (window.scrollY <= 215) { // The window is scrolled less than 215px, and the header "should" come back
        columnHeaders.classList.remove(fixed);
        columnHeaders.style.left = 'unset';
      } else if (columnHeaderPos === 0) {
        columnHeaders.style.left = `${-1 * window.scrollX}px`;
      }
    }));
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
        <TableWrapper votes={ votes } senators={ senators } filteredVoteRecords={ filteredVoteRecords }>
          <FilterByParty />
          <FilterBySearch updateFilter={ updateFilterTermAsync } />
        </TableWrapper>
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
