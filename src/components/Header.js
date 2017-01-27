import React, { Component } from 'react';
import { Link } from 'react-router';

import { header, tiny } from '../stylesheets/header.css';

export default class Header extends Component {
  render() {
    return (
      <div className={ header }>
        <h1>CabinetVotes.org</h1>
        <div>
          <p>Tracking how Senators voted on the confirmation of each member of Trump's Cabinet*.</p>
          <p>Updated after each vote. Click on a Senator's name for contact information.</p>
          <p className={ tiny }>* (and Ambassadors, Justices, etc.)</p>
        </div>
        <p>
          <span>Show: </span>
          <Link to="/rep">Republicans</Link>
          <span> / </span>
          <Link to="/dem">Democrats </Link>
          <span> / </span>
          <Link to="/ind">Independents</Link>
          <span> / </span>
          <Link to="/">All</Link>
        </p>
      </div>
    )
  }
}
