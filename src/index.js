import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import ReactGA from 'react-ga';
import { BrowserRouter } from 'react-router';
import persistState from 'redux-localstorage';

import reducer from './reducers';
import Main from './components/Main';
import AnalyticsMatch from './components/AnalyticsMatch';
import { SHOW_DEV_TOOLS, GA_ID } from './constants';
import initialState from './state.json';

const composeEnhancers = (SHOW_DEV_TOOLS && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;  // eslint-disable-line max-len, no-underscore-dangle

const store = createStore(reducer, initialState, composeEnhancers(
  applyMiddleware(...[thunk]),
  persistState(),
));

ReactGA.initialize(GA_ID);

const rootEl = document.getElementById('main');
const render = () => {
  ReactDOM.render(
    <Provider store={ store }>
      <BrowserRouter>
        <div>
          <AnalyticsMatch pattern="/:party?" component={ Main } />
        </div>
      </BrowserRouter>
    </Provider>,
    rootEl,
  );
};

if (module.hot) {
  module.hot.accept('./components/Main', () => {
    render();
  });
}

render();
