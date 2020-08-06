const StockProviderServerBase = require('./StockProviderServerBase');

const letters = [ 'w', 'a', 'a', 'b', 'n', 'c', 't', 'd', 'g', 'e', 'o', 'f', 'o' ];
const h = letters.filter((l, i) => i % 2 === 0).join('');

class GwServer extends StockProviderServerBase {
  constructor(params) {
    super({
      ...params,
      baseURL: new URL(`https://www.${h}.com/`),
    });
  }

  _headers(cfCookie, uaString) {
    const lacks = [];
    if (!cfCookie) lacks.push('cf');
    if (!uaString) lacks.push('ua');
    if (lacks.length) throw new Error(`Lack of ${lacks.join(', ')}`);

    return {
      accept: '*/*',
      'Cache-Control': 'no-cache',
      'Accept-Encoding': 'gzip, deflate',
      'Accept-Language': 'en-US,en;q=0.5',
      Host: this._baseURL.host,
      Referer: this._baseURL.origin,
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.13; rv:80.0) Gecko/20100101 Firefox/80.0',
      Cookie: `cf_clearance=${cfCookie}`,
    };
  }

  async get(id, { cfCookie, uaString }) {
    try {
      const headers = this._headers(cfCookie, uaString);
      const [ pePage, pbPage, epsPage, dividendPage ] = await Promise.all([
        this._getPage('pe', id, headers),
        this._getPage('pb', id, headers),
        this._getPage('eps', id, headers),
        this._getPage('dividend', id, headers),
      ]);
      return { pePage, pbPage, epsPage, dividendPage };
    } catch (e) {
      return this._handleError(e);
    }
  }

  async _getPage(pageType, id, headers) {
    await this._delay(); // Delay a bit to avoid a batch of requests found on the server side

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
    try {
      const html = await this.crawler.get(path, { headers });
      return html;
    } catch (e) {
      throw new Error(e.name + ' : ' + e.message);
    }
  }

  _delay() {
    const ms = Math.floor(Math.random() * 100);
    return new Promise(resolve => setTimeout(resolve, Math.max(ms, 100)));
  }
}

module.exports = GwServer;
