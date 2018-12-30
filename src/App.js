import './polyfills';

import React from 'react';
import { Provider } from 'react-redux';

import Main from './components/Main';
import UniversalRouter from './components/UniversalRouter';
import AnalyticsMatch from './components/AnalyticsMatch';
import createOrHydrateStore from './utils/createOrHydrateStore';

const App = (store = createOrHydrateStore()) => (
  <Provider store={store}>
    <UniversalRouter>
      <div>
        <AnalyticsMatch pattern="/:party?" component={Main} />
      </div>
    </UniversalRouter>
  </Provider>
);

export default App;
