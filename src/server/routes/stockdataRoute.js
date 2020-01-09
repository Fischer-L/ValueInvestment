const cloudscraper = require('cloudscraper');

const CacheProvider = require('../cacheProvider');
const { env } = require('../../build/config_server');
const GwServer = require('../../lib/stockProvider/GwServer');

const stockdataCache = new CacheProvider();
const gwStockProvider = new GwServer({ env, cloudscraper, challenge: true });

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
      const [ gwStockData ] = await Promise.all([ gwStockProvider.get(req.params.id) ]);
      data = { gwStockData };
      stockdataCache.set(cacheKey, data);
    }
    res.json(data);
  });
}

module.exports = initStockdataRoute;
