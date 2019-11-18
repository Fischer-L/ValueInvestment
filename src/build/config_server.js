const utils = require('./utils');
const configClient = require('./config_client');

// 'webpack-dev-svr': Run with the Webpack dev server in the dev mode
// 'local-dev': Run with the local server in the dev mode
// 'docker-dev': Run with the docker server in the dev mode
// 'production': Run in the priduction mode
const env = process.env.ENV || 'local-dev';

const publicDir = utils.resolve('public');

let port = 9000;
if (env === 'production') {
  port = 443;
}
if (process.env.PORT) {
  port = process.env.PORT;
}

let DB_URL = process.env.MONGODB_URI;
if (env === 'local-dev') {
  DB_URL = require('./config_local').DB_URL; // eslint-disable-line global-require
}

module.exports = {
  ...configClient,
  env,
  port,
  publicDir,

  DB_URL,
};
