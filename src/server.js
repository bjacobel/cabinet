import serverRender from 'preact-render-to-string';

import App from './App';
import template from './index.html.ejs';

export default () => {
  let manifest;
  try {
    // eslint-disable-next-line global-require, import/no-unresolved
    manifest = require('../dist/manifest.json');
  } catch (_) {
    throw new Error('No browser asset manifest in /dist. You need to run the browser build before the server one.');
  }
  return template({
    html: serverRender(App),
    css: [manifest['browser.css']],
    js: [manifest['browser.js']],
  });
};
