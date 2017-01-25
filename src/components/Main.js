import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Column, Cell } from 'fixed-data-table';
import 'fixed-data-table/dist/fixed-data-table.css';
// import { Link } from 'react-router';

import styles from '../stylesheets/main.css';
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
      <Table
        rowHeight={ 50 }
        rowsCount={ 100 }
        width={ window.innerWidth }
        height={ window.innerHeight }
        headerHeight={ 50 }
      >
        <Column
          header={ <Cell></Cell> }
          cell={ <Cell>Column 1 static content</Cell> }
          width={ 50 }
        />
        <Column
          header={ <Cell>Col 2</Cell> }
          cell={ <Cell>Column 2 static content</Cell> }
          width={ 50 }
        />
        <Column
          header={ <Cell>Col 3</Cell> }
          cell={ props => (
            <Cell { ...props }>
              foo
            </Cell>
          ) }
          width={ 50 }
        />
      </Table>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);
