import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Table, Column, Cell } from 'fixed-data-table';
import 'fixed-data-table/dist/fixed-data-table.css';
import classnames from 'classnames';

import { cell, data, r, d, i, senLink, yea, nay, filters } from '../stylesheets/main.css';
import { link } from '../stylesheets/shared.css';
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
    this.props.getCabinetAsync();
  }

  render() {
    let { votes, voters } = this.props;
    const { party } = this.props.params;
    const exampleVotes = Object.values(voters)[0] || [];

    return (
      <div className={ data }>
        <div className={ filters }>
          <p>
            <span>Show: </span>
            <Link className={ link } to="/rep">Republicans</Link>
            <span> / </span>
            <Link className={ link } to="/dem">Democrats </Link>
            <span> / </span>
            <Link className={ link } to="/ind">Independents</Link>
            <span> / </span>
            <Link className={ link } to="/">All</Link>
          </p>
        </div>
        <Table
          rowHeight={ 42 }
          rowsCount={ exampleVotes.length }
          width={ 9999 }
          height={ (42 * exampleVotes.length) + 65 }
          headerHeight={ 65 }
        >
          <Column // Names of senators
            width={ 315 }
            cell={ (props) => {
              if (exampleVotes) {
                const senator = exampleVotes[props.rowIndex];
                return (
                  <Cell className={ classnames(cell, partyClass(senator.party)) }>
                    <a className={ senLink } href={ senator.link }>{ senator.name }</a>
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
        <p>
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
