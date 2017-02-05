import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import ReactGA from 'react-ga';
import { BrowserRouter } from 'react-router';

import reducer from './reducers';
import Main from './components/Main';
import AnalyticsMatch from './components/AnalyticsMatch';
import { SHOW_DEV_TOOLS, GA_ID } from './constants';
import template from './index.html.ejs';

const composeEnhancers = (SHOW_DEV_TOOLS && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;  // eslint-disable-line max-len, no-underscore-dangle

const store = createStore(reducer, {}, composeEnhancers(
  applyMiddleware(...[thunk]),
));

const app = path => (
  <Provider store={ store }>
    <BrowserRouter>
      <div>
        <AnalyticsMatch path={ path } pattern="/" exactly component={ Main } />
        <AnalyticsMatch path={ path } pattern="/:party" component={ Main } />
      </div>
    </BrowserRouter>
  </Provider>
);

if (typeof document !== 'undefined') {
  ReactGA.initialize(GA_ID);

  const rootEl = document.getElementById('main');
  const render = () => {
    ReactDOM.render(app(), rootEl);
  };

  if (module.hot) {
    module.hot.accept('./components/Main', () => {
      render();
    });
  }

  render();
}

export default (locals) => {
  return template({
    serverHtml: ReactDOMServer.renderToString(app(locals.path)),
    serverRender: true,
  });
};
