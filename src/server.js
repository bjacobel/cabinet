import { renderToString } from 'react-dom/server';

import App from './App';
import template from './index.html.ejs';
import createOrHydrateStore from './utils/createOrHydrateStore';
import { getCabinetAsync } from './actions/cabinet';

export default async () => {
  let manifest;
  try {
    // eslint-disable-next-line global-require, import/no-unresolved
    manifest = require('../dist/manifest.json');
  } catch (_) {
    throw new Error('No browser asset manifest in /dist. You need to run the browser build before the server one.');
  }

  const store = createOrHydrateStore();

  await store.dispatch(getCabinetAsync());

  return template({
    state: JSON.stringify(store.getState()),
    html: renderToString(App(store)),
    css: [manifest['browser.css']],
    js: [manifest['browser.js']],
  });
};
