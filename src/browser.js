import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';

import App from './App';
import { GA_ID } from './constants';

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
