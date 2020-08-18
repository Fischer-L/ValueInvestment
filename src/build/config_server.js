const utils = require('./utils');
const configClient = require('./config_client');

// 'local-dev': Run with the local server in the dev mode
// 'docker-test': Run with the docker server in the test mode
// 'production': Run in the priduction mode
const env = process.env.ENV || 'local-dev';

const publicDir = utils.resolve('public');

let port = 9981;
if (env === 'production') {
  port = 443;
}
if (process.env.PORT) {
  port = process.env.PORT;
}

let DB_URL = process.env.MONGODB_URI;
if (env === 'local-dev') {
  const configLocal = require('./config_local'); // eslint-disable-line global-require
  DB_URL = configLocal.DB_URL;
}

module.exports = {
  ...configClient,
  env,
  port,
  publicDir,

  DB_URL,
};
