const cloudscraper = require('cloudscraper');

const CacheProvider = require('../cacheProvider');
const { env } = require('../../build/config_server');
const stockProvider = require('../stockProvider')({ env, cloudscraper });

const stockdataCache = new CacheProvider();

function shouldInvalidateCache(req) {
  const { noCache } = req.query;
  return noCache ? noCache.toLowerCase() === 'true' : false;
}

function initStockdataRoute(app) {
  app.get('/stockdata/:id', async (req, res) => {
    const cacheKey = req.path;

    if (shouldInvalidateCache(req)) {
      stockdataCache.remove(cacheKey);
    }

    let data = stockdataCache.get(cacheKey);
    if (!data) {
      data = await stockProvider.get(req.params.id);
      stockdataCache.set(cacheKey, data);
    }
    res.json(data);
  });
}

module.exports = initStockdataRoute;
