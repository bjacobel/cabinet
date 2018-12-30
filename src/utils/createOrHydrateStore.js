import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducer from '../reducers';
import { SHOW_DEV_TOOLS } from '../constants';

const composeEnhancers = (SHOW_DEV_TOOLS && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose; // eslint-disable-line max-len, no-underscore-dangle

const createOrHydrateStore = () =>
  createStore(
    reducer,
    (window && window.__initial_state) || {}, // eslint-disable-line no-underscore-dangle
    composeEnhancers(applyMiddleware(...[thunk]))
  );

export default createOrHydrateStore;
