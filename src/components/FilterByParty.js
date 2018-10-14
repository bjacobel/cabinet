import React, { Component } from 'react';
import Link from 'react-router-dom/Link';

import { partyFilter } from '../stylesheets/filterByParty.css';

export default class FilterByParty extends Component {
  render() {
    return (
      <p className={partyFilter}>
        <span>Show: </span>
        <br />
        <Link to="/rep">Republicans</Link>
        <span> / </span>
        <Link to="/dem">Democrats </Link>
        <br />
        <Link to="/ind">Independents</Link>
        <span> / </span>
        <Link to="/">All</Link>
      </p>
    );
  }
}
