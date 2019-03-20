const utils = require('./utils');

// 'webpack-dev-svr': Run with the Webpack dev server in the dev mode
// 'local-dev': Run with the local server in the dev mode
// 'production': Run in the priduction mode
const env = process.env.ENV || 'local-dev';

const publicDir = utils.resolve('public');

const port = process.env.PORT || 9000;

const url = `http://localhost:${port}`;

module.exports = {
  env,
  url,
  port,
  publicDir,
};
