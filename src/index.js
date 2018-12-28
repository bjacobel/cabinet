import './polyfills';

import React from 'react';
import ReactDOM from 'react-dom';
import serverRender from 'preact-render-to-string'; // eslint-disable-line import/extensions
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import ReactGA from 'react-ga';

import reducer from './reducers';
import Main from './components/Main';
import UniversalRouter from './components/UniversalRouter';
import AnalyticsMatch from './components/AnalyticsMatch';
import { SHOW_DEV_TOOLS, GA_ID } from './constants';
import template from './index.html.ejs';

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

if (typeof global.document !== 'undefined') {
  const rootEl = document.getElementById('main');
  ReactGA.initialize(GA_ID);

  const render = () => {
    ReactDOM.render(App, rootEl);
  };

  if (module.hot) {
    module.hot.accept('./components/Main', () => {
      render();
    });
  }

  render();
}

export default (locals) => {
  const assets = Object.keys(locals.webpackStats.compilation.assets);
  return template({
    html: serverRender(App),
    css: assets.filter((value) => value.match(/\.css$/)),
    js: assets.filter((value) => value.match(/\.js$/)),
  });
};
