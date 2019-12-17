const { env, LOGIN_CLIENT_KEY, LOGIN_CLIENT_VALUE } = require('../build/config_server');
const HTTP = require('./httpStatusCodes');

const inProduction = env === 'production';

const LOGIN_KEY = '__a8';
const LOGIN_VALUE = 'z8%20284h96';
const LOGIN_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: inProduction,
  sameSite: 'Strict',
};
const LOGIN_CLIENT_COOKIE_OPTIONS = {
  httpOnly: false,
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
    if (req.body.pc === '1qa2ws3ed') {
      res.cookie(LOGIN_KEY, LOGIN_VALUE, LOGIN_COOKIE_OPTIONS)
        .cookie(LOGIN_CLIENT_KEY, LOGIN_CLIENT_VALUE, LOGIN_CLIENT_COOKIE_OPTIONS)
        .sendStatus(HTTP.OK);
    } else {
      res.status(HTTP.UNAUTHORIZED).send('Unauthorized');
    }
  },

  logout(req, res) {
    res.clearCookie(LOGIN_KEY).clearCookie(LOGIN_CLIENT_KEY).sendStatus(HTTP.OK);
  },

  collectPayload(req, res, next) {
    try {
      const payload = req.body.payload;
      if (payload instanceof Array && payload.length > 0) {
        res.locals.payload = payload;
      } else {
        throw new Error(`No body payload to collect - ${req.body}`);
      }
    } catch (e) {
      res.status(HTTP.BAD_REQUEST).send(e.toString());
      return;
    }
    next();
  },

  collectIDs(req, res, next) {
    try {
      const ids = req.query.ids;
      if (ids) {
        res.locals.ids = ids.split(',');
      } else {
        throw new Error(`No ids in query: ${req.query}`);
      }
    } catch (e) {
      res.status(HTTP.BAD_REQUEST).send(e.toString());
      return;
    }
    next();
  },
};

module.exports = middlewares;
