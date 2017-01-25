import React, { Component } from 'react';
import ReactGA from 'react-ga';
import { BrowserRouter } from 'react-router';

import Main from './Main';
import { GA_ID } from '../constants';
import AnalyticsMatch from './AnalyticsMatch';

export default class Routes extends Component {
  componentWillMount() {
    if (typeof window !== 'undefined') {
      ReactGA.initialize(GA_ID);
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <AnalyticsMatch pattern="/" exactly component={ Main } />
          <AnalyticsMatch pattern="/:party" component={ Main } />
        </div>
      </BrowserRouter>
    );
  }
}
