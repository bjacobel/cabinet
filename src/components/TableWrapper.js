import React, { Component } from 'react';
import { Table, Column, Cell } from 'fixed-data-table-2';
import 'fixed-data-table-2/dist/fixed-data-table.css';
import classnames from 'classnames';
import ReactHint from 'react-hint';

import 'react-hint/css/index.css';

import {
  table,
  cell,
  cellCenter,
  r,
  d,
  i,
  yes,
  no,
  voteText,
  antiskew,
  cabinetHint,
  smol,
} from '../stylesheets/tableWrapper.css';
import Phone from './Phone';

const partyClass = party => ({
  [r]: party === 'Republican',
  [d]: party === 'Democrat',
  [i]: party === 'Independent',
});

const voteClass = vote => ({
  [yes]: vote === 'Yes',
  [no]: vote === 'No',
});

const voteRepr = (vote) => {
  switch (vote) {
  case 'Yes':
    return '✓';
  case 'No':
    return '✗';
  case undefined:
    return '';
  default:
    return '•';
  }
};

const headerize = (text) => {
  return (
    <span className={ classnames({ [smol]: text.length > 20 }) }>
      { text.split(' ').map((textchunk, ind) => {
        return <span className={ antiskew } key={ ind }>{ `${textchunk} ` }</span>; // eslint-disable-line react/no-array-index-key, max-len
      }) }
    </span>
  );
};

export default class TableWrapper extends Component {
  render() {
    const { senators, votes, voteTotals, voteRecords, children } = this.props;

    let tableWidth = (Object.entries(voteRecords).length * 62) + (200 + 50 + 40 + 70) + 120;
    if (tableWidth < window.innerWidth) {
      tableWidth = window.innerWidth;
    }

    return (
      <div className={ table }>
        <Table
          rowHeight={ 38 }
          rowsCount={ senators.length }
          width={ tableWidth }
          height={ (38 * senators.length) + 152 }
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
              const totals = voteTotals[senator.id] || { yeas: 0, total: 0 };

              return (
                <Cell className={ classnames(cellCenter, partyClass(senator.party)) }>
                  { totals.yeas } / { totals.total }
                </Cell>
              );
            } }
          />
          { Object.entries(voteRecords).map(([voteId, votersForVote]) => {
            return (
              <Column // The vote on each nominee
                key={ voteId }
                width={ 42 }
                header={ () => (
                  <Cell
                    className={ cell }
                    data-rh={ votes[voteId].description }
                    data-rh-at="bottom"
                  >
                    { headerize(votes[voteId].name) }
                  </Cell>
                ) }
                cell={ (props) => {
                  const senator = senators[props.rowIndex];

                  if (votersForVote[senator.id]) {
                    const vote = votersForVote[senator.id].value;
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
        <ReactHint className={ `${cabinetHint} react-hint` } />
      </div>
    );
  }
}
