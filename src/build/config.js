const utils = require('./utils');

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
