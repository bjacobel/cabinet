import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';

import { getCabinetAsync } from './actions/cabinet';
import reducer from './reducers';

(() => {
  const store = createStore(reducer, {}, compose(
    applyMiddleware(thunk),
  ));

  return store.dispatch(getCabinetAsync()).then(() => {
    console.log(JSON.stringify(store.getState()));
  });
})();
