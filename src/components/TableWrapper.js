import React, { Component } from 'react';
import { Table, Column, Cell } from 'fixed-data-table-2';
import 'fixed-data-table-2/dist/fixed-data-table.css';
import classnames from 'classnames';

import {
  table,
  cell,
  cellCenter,
  r,
  d,
  i,
  yea,
  nay,
  voteText,
  antiskew,
} from '../stylesheets/tableWrapper.css';
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

const voteRepr = (vote) => {
  switch (vote) {
  case 'Yea':
    return '✓';
  case 'Nay':
    return '✗';
  default:
    return '';
  }
};

const headerize = (text) => {
  return text.split(' ').map((textchunk, ind) => {
    return <span className={ antiskew } key={ ind }>{ `${textchunk} ` }</span>; // eslint-disable-line react/no-array-index-key, max-len
  });
};

export default class TableWrapper extends Component {
  render() {
    const { senators, votes, voteTotals, filteredVoteRecords, children } = this.props;

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
            width={ 200 }
            header={ children }
            cell={ (props) => {
              if (senators) {
                const senator = senators[props.rowIndex];
                return (
                  <Cell className={ classnames(cell, partyClass(senator.party)) }>
                    <a href={ senator.link }>{ senator.lastName }</a>
                  </Cell>
                );
              } else {
                return <Cell />;
              }
            } }
          />
          <Column // States of senators
            width={ 50 }
            header={ () => <Cell className={ cell } style={ { paddingTop: '6px' } }>{ headerize('State') }</Cell> }
            cell={ (props) => {
              if (senators) {
                const senator = senators[props.rowIndex];
                return (
                  <Cell className={ classnames(cell, partyClass(senator.party)) }>
                    { senator.state }
                  </Cell>
                );
              } else {
                return <Cell />;
              }
            } }
          />
          <Column // Contact links of senators
            width={ 40 }
            header={ () => <Cell className={ cell }>{ headerize('Contact') }</Cell> }
            cell={ (props) => {
              if (senators) {
                const senator = senators[props.rowIndex];
                return (
                  <Cell className={ classnames(cell, partyClass(senator.party)) }>
                    <span>&nbsp;</span>
                    <Phone number={ senator.phone } name={ senator.name } />
                  </Cell>
                );
              } else {
                return <Cell />;
              }
            } }
          />
          <Column // Record on votes so far
            width={ 70 }
            header={ () => (
              <Cell className={ cell } style={ { paddingTop: '13px' } } >
                { headerize('Record (yeas / total)') }
              </Cell>
            ) }
            cell={ (props) => {
              const senator = senators[props.rowIndex];
              return (
                <Cell className={ classnames(cellCenter, partyClass(senator.party)) }>
                  { voteTotals[senator.name] } / { voteTotals.total }
                </Cell>
              );
            } }
          />
          { Object.entries(filteredVoteRecords).map(([voteId, votersForVote]) => {
            return (
              <Column // The vote on each nominee
                key={ voteId }
                width={ 62 }
                header={ () => <Cell className={ cell }>{ headerize(votes[voteId].question) }</Cell> }
                cell={ (props) => {
                  if (votersForVote[props.rowIndex]) {
                    const vote = votersForVote[props.rowIndex].value;
                    return (
                      <Cell className={ classnames(cellCenter, voteClass(vote)) }>
                        <span>{ voteRepr(vote) }</span>
                        <span className={ voteText }>{ vote }</span>
                      </Cell>
                    );
                  } else {
                    return null;
                  }
                } }
              />
            );
          })}
        </Table>
      </div>
    );
  }
}
