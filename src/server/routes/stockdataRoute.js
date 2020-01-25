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
      const providers = [
        [ 'gwStockData', gwStockProvider ],
      ];
      const dataArray = await Promise.all(
        providers.map(provider => provider[1].get(req.params.id)),
      );

      data = { error: '' };
      providers.forEach(([ key ], i) => {
        if (dataArray[i].error) {
          data.error += ' / ' + dataArray[i].error;
        } else {
          data[key] = dataArray[i];
        }
      });
      if (!data.error) {
        stockdataCache.set(cacheKey, data);
      }
    }
    res.json(data);
  });
}

module.exports = initStockdataRoute;
