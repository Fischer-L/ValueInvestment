const axios = require('axios');
const cloudscraper = require('../../lib/myCloudscraper');

const CacheProvider = require('../cacheProvider');
const handleError = require('../utils/handleError');
const GwServer = require('../../lib/stockProvider/GwServer');
const GooServer = require('../../lib/stockProvider/GooServer');

const stockdataCache = new CacheProvider();
const gwStockProvider = new GwServer({ cloudscraper });
const gooStockProvider = new GooServer({ axios });

function shouldInvalidateCache(req) {
  const { noCache } = req.query;
  return noCache ? noCache.toLowerCase() === 'true' : false;
}

function initStockdataRoute(app) {
  app.get('/stockdata/:id', async (req, res) => {
    let data = null;
    try {
      const cacheKey = req.path;

      if (shouldInvalidateCache(req)) {
        stockdataCache.remove(cacheKey);
      }

      data = stockdataCache.get(cacheKey);
      if (!data) {
        const providers = [
          [ 'gwStockData', gwStockProvider ],
          [ 'gooStockData', gooStockProvider ],
        ];
        const dataArray = await Promise.all(
          providers.map(provider => provider[1].get(req.params.id, req.query)),
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
    } catch (e) {
      data = handleError(e);
    }
    res.json(data);
  });
}

module.exports = initStockdataRoute;
