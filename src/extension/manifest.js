/* eslint import/no-dynamic-require: "off" */

const fs = require('fs');

const utils = require('../build/utils');

const { resolve } = utils;

const DOMAINS = require(resolve('./src/utils/domains'));
const config = require(resolve('./src/build/config_extension'));

const manifest = {
  version: '1.0',
  manifest_version: 2,
  name: 'iValue',
  description: 'iValue',
  browser_action: {
    default_popup: 'popup.html',
  },
  background: {
    scripts: [ 'backgroundScript.js' ],
    persistent: false,
  },
  content_scripts: [
    {
      matches: [ 'https://*/*' ],
      run_at: 'document_idle',
      js: [ 'contentScript.js' ],
    },
    {
      matches: [ 'http://localhost:9858/*', 'https://value-investment.herokuapp.com/*' ],
      run_at: 'document_idle',
      js: [ 'appContentScript.js' ],
    },
    {
      matches: [ DOMAINS.gw + '/*' ],
      run_at: 'document_idle',
      js: [ 'gwContentScript.js' ],
    },
    {
      matches: [ DOMAINS.gi + '/*' ],
      run_at: 'document_idle',
      js: [ 'giContentScript.js' ],
    },
  ],
  permissions: [
    'activeTab',
    'storage',
    'https://*/',
  ],
};

fs.writeFile(resolve(config.EXTENSION_DIR + '/manifest.json'), JSON.stringify(manifest), 'utf8', function (err) {
  if (err) {
    return console.log(err);
  }
  console.log('Emitted manifest.json');
});
