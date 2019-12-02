const cloudscraper = require('cloudscraper');

const CacheProvider = require('../cacheProvider');
const { env } = require('../../build/config_server');
const stockProvider = require('../stockProvider')({ env, cloudscraper });

const stockdataCache = new CacheProvider({
  shouldInvalidateCache(req) {
    const { noCache } = req.query;
    return noCache ? noCache.toLowerCase() === 'true' : false;
  },
});

function initStockdataRoute(app) {
  app.get('/stockdata/:id', async (req, res) => {
    let data = stockdataCache.get(req);
    if (!data) {
      data = await stockProvider.get(req.params.id);
      stockdataCache.set(req, data);
    }
    res.json(data);
  });
}

module.exports = initStockdataRoute;
