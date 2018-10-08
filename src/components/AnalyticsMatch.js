import React, { Component, createElement } from 'react';
import { Match } from 'react-router';
import ReactGA from 'react-ga';

import { COLLECT_ANALYTICS } from '../constants';

export default class AnalyticsMatch extends Component {
  render() {
    const { path, pattern, exactly, component } = this.props;

    return (
      <Match
        pattern={pattern}
        exactly={exactly}
        render={(matchProps) => {
          if (typeof window !== 'undefined' && COLLECT_ANALYTICS) {
            try {
              ReactGA.pageview(path || window.location.pathname);
            } catch (err) {
              console.warn("can't contact GA");
            }
          }

          return createElement(component, matchProps);
        }}
      />
    );
  }
}
