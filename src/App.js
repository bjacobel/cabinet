import './polyfills';

import React from 'react';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';

import reducer from './reducers';
import Main from './components/Main';
import UniversalRouter from './components/UniversalRouter';
import AnalyticsMatch from './components/AnalyticsMatch';
import { SHOW_DEV_TOOLS } from './constants';

const composeEnhancers = (SHOW_DEV_TOOLS && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose; // eslint-disable-line max-len, no-underscore-dangle

const store = createStore(reducer, {}, composeEnhancers(applyMiddleware(...[thunk])));

const App = (
  <Provider store={store}>
    <UniversalRouter>
      <div>
        <AnalyticsMatch pattern="/:party?" component={Main} />
      </div>
    </UniversalRouter>
  </Provider>
);

export default App;
