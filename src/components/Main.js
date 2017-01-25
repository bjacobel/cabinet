import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Column, Cell } from 'fixed-data-table';
import 'fixed-data-table/dist/fixed-data-table.css';
import classnames from 'classnames';
import { Link } from 'react-router';

import { cell, data, r, d, i, senLink, yea, nay } from '../stylesheets/main.css';
import { getCabinetAsync } from '../actions/cabinet';

const mapStateToProps = state => ({
  votes: state.votes,
  voters: state.voters,
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
    const { party } = this.props.params;
    this.props.getCabinetAsync(party);
  }

  render() {
    const { votes, voters } = this.props;
    const exampleVotes = Object.values(voters)[0] || [];

    return (
      <div className={ data }>
        <Table
          rowHeight={ 42 }
          rowsCount={ exampleVotes.length }
          width={ 9999 }
          height={ (42 * 100) + 100 }
          headerHeight={ 65 }
        >
          <Column // Names of senators
            width={ 315 }
            cell={ (props) => {
              if (exampleVotes) {
                const senator = exampleVotes[props.rowIndex];
                return (
                  <Cell className={ classnames(cell, partyClass(senator.party)) }>
                    <Link className={ senLink } to={ senator.link }>{ senator.name }</Link>
                  </Cell>
                );
              } else {
                return <Cell />;
              }
            } }
          />
          { Object.entries(voters).map(([voteId, votersForVote]) => {
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
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);
