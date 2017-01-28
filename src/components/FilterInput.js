import React, { Component } from 'react';

import { filter, filterHint, filterLabel } from '../stylesheets/filterInput.css';

export default class FilterInput extends Component {
  render() {
    return (
      <div>
        <label htmlFor="filter-input" className={ filterLabel }>Filter by:</label>
        <br />
        <input
          id="filter-input"
          className={ filter }
          placeholder="Senator or state"
          aria-describedby="filter-input-hint"
          onChange={ event => this.props.updateFilter(event.target.value) }
        />
        <span className={ filterHint } id="filter-input-hint">Enter a senator&#39;s name or state to search by.</span>
      </div>
    );
  }
}
