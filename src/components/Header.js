import React, { Component } from 'react';
import { Link } from 'react-router';

import { header, tiny, partyFilter } from '../stylesheets/header.css';

export default class Header extends Component {
  render() {
    return (
      <div className={ header }>
        <h1>CabinetVotes.org</h1>
        <div>
          <p>Tracking how Senators voted on the confirmation of Trump&#39;s Cabinet* appointees.</p>
          <p>
            <span>Updated after each vote. Click on a Senator&#39;s name to contact them online, </span>
            <span>or the phone icon to call their office directly.</span>
          </p>
          <p className={ tiny }>* (and Ambassadors, Justices, etc.)</p>
        </div>
        <p className={ partyFilter }>
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
      </div>
    );
  }
}
