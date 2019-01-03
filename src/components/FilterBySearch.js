import React, { Component } from 'react';

import { filterBox, filter, filterHint, filterLabel } from '../stylesheets/filterBySearch.css';

export default class FilterbySearch extends Component {
  render() {
    return (
      <div className={filterBox}>
        <label id="filter-input-label" htmlFor="filter-input" className={filterLabel}>
          Filter by:
          <br />
          <input
            id="filter-input"
            className={filter}
            placeholder="Senator or state"
            aria-labelledby="filter-input-label"
            aria-describedby="filter-input-hint"
            onChange={(event) => this.props.updateFilter(event.target.value)}
          />
        </label>
        <span className={filterHint} id="filter-input-hint">
          Enter a senator&#39;s name or state to search by.
        </span>
      </div>
    );
  }
}
