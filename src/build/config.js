const utils = require('./utils');

// 'local-dev-svr': Run with the Webpack dev server in the dev mode
// 'local-dev': Run with the local server in the dev mode
// 'production': Run in the priduction mode
const env = process.env.ENV || 'local-dev-svr';

const publicDir = utils.resolve('public');

const port = process.env.PORT || 9000;

const host = 'http://localhost';

module.exports = {
  env,
  host,
  port,
  publicDir,
};
