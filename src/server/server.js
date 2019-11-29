const axios = require('axios');
const express = require('express');
const compression = require('compression');
const cookieParser = require('cookie-parser');

const { env, port, publicDir } = require('../build/config_server');
const middlewares = require('./middlewares');
const initBookmarksRoute = require('./routes/bookmarksRoute');
const CacheProvider = require('./cacheProvider');
const stockProvider = require('./stockProvider')({ env, axios });

const PUBLIC_DIR = publicDir;
const PORT = port;
const stockdataCache = new CacheProvider({
  shouldInvalidateCache(req) {
    const { noCache } = req.query;
    return noCache ? noCache.toLowerCase() === 'true' : false;
  },
});
const app = express();

app.use(compression());
app.use(cookieParser());
app.use(express.json());

app.use(express.static(PUBLIC_DIR, {
  setHeaders(res, path) {
    if (path.includes('/index.html')) return;
    res.set('Cache-Control', 'public, max-age=31536000');
  },
}));

app.get('/stockdata/:id', async (req, res) => {
  let data = stockdataCache.get(req);
  if (!data) {
    data = await stockProvider.get(req.params.id);
    stockdataCache.set(req, data);
  }
  res.json(data);
});

initBookmarksRoute(app);

app.post('/login', middlewares.login);
app.get('/logout', middlewares.logout);
app.post('/logout', middlewares.logout);

app.listen(PORT, function () {
  console.log('listening on port:', PORT, __dirname);
  if (env === 'docker-test') process.exit(0);
});
