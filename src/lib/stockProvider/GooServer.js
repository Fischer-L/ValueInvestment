const StockProviderServerBase = require('./StockProviderServerBase');

const letters = [ 'a', 'g', 'r', 'o', '6', 'o', 'q', 'd', 'i', 'i', 'b', 'n', 'z', 'f', 'l', 'o' ];
const h = letters.filter((l, i) => i % 2 === 1).join('');

const UAs = [
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.13; rv:76.0) Gecko/20100101 Firefox/76.0',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36',
];

const headers = {
  accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
  'accept-encoding': 'gzip, deflate, br',
  'accept-language': 'zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7',
  'cache-control': 'no-cache',
  pragma: 'no-cache',
};

class GooServer extends StockProviderServerBase {
  constructor(params) {
    super({
      ...params,
      baseURL: new URL(`https://${h}.tw`),
    });
  }

  async get(id) {
    try {
      headers['user-agent'] = UAs[Date.now() % 2];
      const dividendPolicyPage = await this.crawler.get(`/StockInfo/StockDividendPolicy.asp?STOCK_ID=${id}`, { headers });
      return { dividendPolicyPage };
    } catch (e) {
      return this._handleError(e);
    }
  }
}

module.exports = GooServer;
