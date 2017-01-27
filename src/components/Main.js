import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Column, Cell } from 'fixed-data-table';
import 'fixed-data-table/dist/fixed-data-table.css';
import classnames from 'classnames';

import { cell, data, r, d, i, yea, nay, footer } from '../stylesheets/main.css';
import { getCabinetAsync } from '../actions/cabinet';
import Header from './Header';

const mapStateToProps = state => ({
  votes: state.votes,
  voteRecords: state.voteRecords,
});

const mapDispatchToProps = {
  getCabinetAsync,
};

const partyClass = party => ({
  [r]: party === 'Republican',
  [d]: party === 'Democrat',
  [i]: party === 'Independent',
});

const voteClass = vote => ({
  [yea]: vote === 'Yea',
  [nay]: vote === 'Nay',
});

class Main extends Component {
  componentWillMount() {
    this.props.getCabinetAsync();
  }

  render() {
    const { votes, voteRecords } = this.props;
    const { party } = this.props.params;
    const partyRegexp = new RegExp(party || '.+', 'i');

    const filteredVoteRecords = {};
    Object.entries(voteRecords).forEach(([voteId, votersForVote]) => {
      filteredVoteRecords[voteId] = votersForVote.filter(voter => voter.party.match(partyRegexp));
    });

    const senators = Object.values(filteredVoteRecords)[0] || [];

    return (
      <div className={ data }>
        <Header />
        <Table
          rowHeight={ 42 }
          rowsCount={ senators.length }
          width={ 9999 }
          height={ (42 * senators.length) + 65 }
          headerHeight={ 65 }
        >
          <Column // Names of senators
            width={ 315 }
            cell={ (props) => {
              if (senators) {
                const senator = senators[props.rowIndex];
                return (
                  <Cell className={ classnames(cell, partyClass(senator.party)) }>
                    <a href={ senator.link }>{ senator.name }</a>
                  </Cell>
                );
              } else {
                return <Cell />;
              }
            } }
          />
          { Object.entries(filteredVoteRecords).map(([voteId, votersForVote]) => {
            return (
              <Column // The vote on each nominee
                key={ voteId }
                width={ 110 }
                header={ () => <Cell className={ cell }>{ votes[voteId].question }</Cell> }
                cell={ (props) => {
                  const vote = votersForVote[props.rowIndex].value;
                  return (
                    <Cell className={ classnames(cell, voteClass(vote)) }>
                      { vote }
                    </Cell>
                  );
                } }
              />
            );
          })}
        </Table>
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
