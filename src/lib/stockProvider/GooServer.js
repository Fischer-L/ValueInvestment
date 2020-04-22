const StockProviderServerBase = require('./StockProviderServerBase');

const letters = [ 'a', 'g', 'r', 'o', '6', 'o', 'q', 'd', 'i', 'i', 'b', 'n', 'z', 'f', 'l', 'o' ];
const h = letters.filter((l, i) => i % 2 === 1).join('');

const UAs = [
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.13; rv:76.0) Gecko/20100101 Firefox/76.0',
  'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.111 Safari/537.36',
  'Mozilla/5.0 (X11; CrOS x86_64 8172.45.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.64 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/601.3.9 (KHTML, like Gecko) Version/9.0.2 Safari/601.3.9',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246',
];

const headers = {
  accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
  'accept-encoding': 'gzip, deflate',
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
      headers['user-agent'] = UAs[Date.now() % UAs.length];
      const dividendPolicyPage = await this.crawler.get(`/StockInfo/StockDividendPolicy.asp?STOCK_ID=${id}`, { headers });
      return { dividendPolicyPage };
    } catch (e) {
      return this._handleError(e);
    }
  }
}

module.exports = GooServer;
