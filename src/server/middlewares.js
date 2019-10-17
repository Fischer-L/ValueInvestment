const { env } = require('../build/config');
const HTTP = require('./httpStatusCodes');

const inProduction = env === 'production';

const LOGIN_KEY = '__a8';
const LOGIN_VALUE = 'z8%20284h96';
const LOGIN_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: inProduction,
  sameSite: 'Strict',
};

const middlewares = {
  checkLogin(req, res, next) {
    if (req.cookies[LOGIN_KEY] === LOGIN_VALUE) {
      next();
    } else {
      res.status(HTTP.UNAUTHORIZED).send('Unauthorized');
    }
  },

  login(req, res) {
    if (req.body === '1qa2ws3ed') {
      res.cookie(LOGIN_KEY, LOGIN_VALUE, LOGIN_COOKIE_OPTIONS).send();
    } else {
      res.status(HTTP.UNAUTHORIZED).send('Unauthorized');
    }
  },

  logout(req, res) {
    res.clearCookie(LOGIN_KEY).send();
  },
};

module.exports = middlewares;
