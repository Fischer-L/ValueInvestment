const StockProviderServerBase = require('./StockProviderServerBase');

class WantgooServer extends StockProviderServerBase {
  constructor(params) {
    super({
      ...params,
      baseURL: new URL('https://www.wantgoo.com/'),
    });
  }

  async get(id) {
    try {
      const [ pePage, pbPage, epsPage, dividendPage ] = await Promise.all([
        this._getPage('pe', id),
        this._getPage('pb', id),
        this._getPage('eps', id),
        this._getPage('dividend', id),
      ]);
      return { pePage, pbPage, epsPage, dividendPage };
    } catch (e) {
      return this._handleError(e);
    }
  }

  async _getPage(pageType, id) {
    let path = '';
    switch (pageType) {
      case 'pe':
        path = `/stock/report/value?types=1&stockno=${id}`;
        break;

      case 'pb':
        path = `/stock/report/value?types=2&stockno=${id}`;
        break;

      case 'eps':
        path = `/stock/report/basic_eps?stockno=${id}`;
        break;

      case 'dividend':
        path = `/stock/report/basic_dp?stockno=${id}`;
        break;
    }
    const { data } = await this.crawler.get(path);
    return data;
  }
}

module.exports = WantgooServer;
