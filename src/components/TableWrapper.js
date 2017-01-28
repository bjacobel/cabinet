import React, { Component } from 'react';
import { Table, Column, Cell } from 'fixed-data-table';
import 'fixed-data-table/dist/fixed-data-table.css';
import classnames from 'classnames';

import { table, cell, r, d, i, yea, nay, antiskew } from '../stylesheets/tableWrapper.css';

const partyClass = party => ({
  [r]: party === 'Republican',
  [d]: party === 'Democrat',
  [i]: party === 'Independent',
});

const voteClass = vote => ({
  [yea]: vote === 'Yea',
  [nay]: vote === 'Nay',
});

const headerize = (text) => {
  return text.split(' ').map((textchunk, ind) => {
    return <span className={ antiskew } key={ ind }>{ `${textchunk} ` }</span>; // eslint-disable-line react/no-array-index-key, max-len
  });
};

export default class TableWrapper extends Component {
  render() {
    const { senators, votes, filteredVoteRecords, children } = this.props;

    return (
      <div className={ table }>
        { children }
        <Table
          rowHeight={ 42 }
          rowsCount={ senators.length }
          width={ 9999 }
          height={ (42 * senators.length) + 150 + 2 }
          headerHeight={ 150 }
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
                header={ () => <Cell className={ cell }>{ headerize(votes[voteId].question) }</Cell> }
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
