import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Column, Cell } from 'fixed-data-table';
import 'fixed-data-table/dist/fixed-data-table.css';
// import { Link } from 'react-router';

import { cell, data } from '../stylesheets/main.css';
import { getCabinetAsync } from '../actions/cabinet';

const mapStateToProps = state => ({
  votes: state.votes,
  voters: state.voters,
});

const mapDispatchToProps = {
  getCabinetAsync,
};

class Main extends Component {
  componentWillMount() {
    const { party } = this.props.params;
    this.props.getCabinetAsync(party);
  }

  render() {
    const { votes, voters } = this.props;

    return (
      <div className={ data }>
        <Table
          rowHeight={ 42 }
          rowsCount={ 100 }
          width={ window.innerWidth }
          height={ window.innerHeight }
          headerHeight={ 65 }
        >
          <Column // Names of senators
            width={ 315 }
            cell={ (props) => {
              const exampleVotes = Object.values(voters)[0];
              if (exampleVotes) {
                return <Cell className={ cell }>{ exampleVotes.map(x => x.name)[props.rowIndex] }</Cell>;
              } else {
                return <Cell />;
              }
            } }
          />
          { Object.entries(voters).map(([voteId, votersForVote]) => {
            return (
              <Column // The vote on each nominee
                key={ voteId }
                header={ () => <Cell className={ cell }>{ votes[voteId].question }</Cell> }
                cell={ props => <Cell className={ cell }>{ votersForVote[props.rowIndex].value }</Cell> }
                width={ 110 }
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
