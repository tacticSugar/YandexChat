/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/no-extraneous-dependencies
const { JSDOM } = require('jsdom');
const Pug = require('pug');
const fs = require('fs');

const { window } = new JSDOM('<div id="app"></div>', {
  url: 'http://localhost:3000',
});

global.window = window;
global.document = window.document;
global.DocumentFragment = window.DocumentFragment;

require.extensions['.pug'] = (module, filename) => {
  const content = fs.readFileSync(filename, 'utf-8');
  module.exports = Pug.compile(content);
};

require.extensions['.png'] = (module) => {
  module.exports = () => '';
};

require.extensions['.svg'] = (module) => {
  module.exports = () => '';
};

require.extensions['.scss'] = (module) => {
  module.exports = () => '';
};
