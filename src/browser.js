import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';

import App from './App';
import { GA_ID } from './constants';

if (typeof global.document !== 'undefined') {
  const rootEl = document.getElementById('main');

  // If the app was rendered first on the server, window.__initialState will exist. In this case,
  // React should "hydrate" the existing HTML instead of re-rendering it.
  // eslint-disable-next-line no-underscore-dangle
  const renderFn = window.__initialState ? ReactDOM.hydrate : ReactDOM.render;

  ReactGA.initialize(GA_ID);

  const render = () => {
    renderFn(App(), rootEl);
  };

  if (module.hot) {
    module.hot.accept('./components/Main', () => {
      render();
    });
  }

  render();
}
