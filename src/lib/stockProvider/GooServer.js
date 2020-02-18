const StockProviderServerBase = require('./StockProviderServerBase');

const letters = [ 'a', 'g', 'r', 'o', '6', 'o', 'q', 'd', 'i', 'i', 'b', 'n', 'z', 'f', 'l', 'o' ];
const h = letters.filter((l, i) => i % 2 === 1).join('');

class GooServer extends StockProviderServerBase {
  constructor(params) {
    super({
      ...params,
      baseURL: new URL(`https://${h}.tw`),
    });
  }

  async get(id) {
    try {
      const dividendPolicyPage = await this.crawler.get(`/StockInfo/StockDividendPolicy.asp?STOCK_ID=${id}`);
      return { dividendPolicyPage };
    } catch (e) {
      return this._handleError(e);
    }
  }
}

module.exports = GooServer;
