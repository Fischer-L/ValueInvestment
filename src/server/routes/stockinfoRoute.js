const axios = require('axios');
const CacheProvider = require('../cacheProvider');
const handleError = require('../utils/handleError');
const DOMAINS = require('../../utils/domains');

const infoCache = new CacheProvider();

const infoFetcher = {
  host: [ 'a', 'g', 'r', 'o', '6', 'o', 'q', 'd', 'i', 'i', 'b', 'n', 'z', 'f', 'l', 'o' ].filter((l, i) => i % 2 === 1).join(''),

  UAs: [
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.13; rv:76.0) Gecko/20100101 Firefox/76.0',
    'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.111 Safari/537.36',
    'Mozilla/5.0 (X11; CrOS x86_64 8172.45.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.64 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/601.3.9 (KHTML, like Gecko) Version/9.0.2 Safari/601.3.9',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246',
  ],

  headers: {
    accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'accept-encoding': 'gzip, deflate',
    'accept-language': 'zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7',
    'cache-control': 'no-cache',
    pragma: 'no-cache',
  },

  async get(id) {
    try {
      const headers = {
        ...this.headers,
        'user-agent': this.UAs[Date.now() % this.UAs.length],
      };
      const resp = await axios.get(`${DOMAINS.gi}/tw/StockDetail.asp?STOCK_ID=${id}`, { headers });
      if (resp.status !== 200) {
        throw new Error(resp.status + ':' + resp.statusText);
      }

      const titleTag = resp.data.match(/<title>.+<\/title>/)[0];
      return {
        name: titleTag.split(' ')[0].slice(13),
      };
    } catch (e) {
      throw e;
    }
  },
};

function initStockinfoRoute(app) {
  app.get('/stockinfo/:id', async (req, res) => {
    let data = null;
    try {
      const cacheKey = req.path;
      data = infoCache.get(cacheKey);
      if (!data) {
        data = await infoFetcher.get(req.params.id);
        infoCache.set(cacheKey, data);
      }
    } catch (e) {
      data = handleError(e);
    }
    res.json(data);
  });
}

module.exports = initStockinfoRoute;
