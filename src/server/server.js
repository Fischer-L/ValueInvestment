const http = require('http');
const axios = require('axios');
const express = require('express');
const compression = require('compression');

const { env, port, publicDir } = require('../build/config');
const CacheProvider = require('./cacheProvider');
const stockProvider = require('./stockProvider')({ env, axios });

const PUBLIC_DIR = publicDir;
const PORT = port;
const cache = new CacheProvider({
  maxAge: 10 * 60 * 1000, // 10 mins
  shouldInvalidateCache(req) {
    const { noCache } = req.query;
    return noCache ? noCache.toLowerCase() === 'true' : false;
  },
});
const app = express();

app.use(compression());
app.use(express.static(PUBLIC_DIR, {
  setHeaders(res, path) {
    if (path.includes('/index.html')) return;
    res.set('Cache-Control', 'public, max-age=31536000');
  },
}));

app.get('/stockdata/:id', async (req, res) => {
  let data = cache.get(req);
  if (!data) {
    data = await stockProvider.get(req.params.id);
    cache.set(req, data);
  }
  res.json(data);
});

const httpSvr = http.Server(app);
httpSvr.listen(PORT, function () {
  console.log('listening on port:', PORT, __dirname);
});
