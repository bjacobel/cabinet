import React, { Component } from 'react';
import { Table, Column, Cell } from 'fixed-data-table-2';
import 'fixed-data-table-2/dist/fixed-data-table.css';
import classnames from 'classnames';

import { table, cell, r, d, i, yea, nay, antiskew } from '../stylesheets/tableWrapper.css';
import Phone from './Phone';

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
        <Table
          rowHeight={ 42 }
          rowsCount={ senators.length }
          width={ 4000 }
          height={ (42 * senators.length) + 152 }
          headerHeight={ 150 }
          showScrollbarX={ false }
        >
          <Column // Names of senators
            width={ 355 }
            header={ children }
            cell={ (props) => {
              if (senators) {
                const senator = senators[props.rowIndex];
                return (
                  <Cell className={ classnames(cell, partyClass(senator.party)) }>
                    <a href={ senator.link }>{ senator.name }</a>
                    <Phone number={ senator.phone } name={ senator.name } />
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
