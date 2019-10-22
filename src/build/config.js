const utils = require('./utils');

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

module.exports = {
  env,
  port,
  publicDir,

  LOGIN_CLIENT_KEY: '__a6',
  LOGIN_CLIENT_VALUE: '5j04284fu06',
};
