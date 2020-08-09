const handleError = require('../../server/utils/handleError');
const proxyPy = require('./proxyPy');

class StockProviderServerBase {
  // - baseURL: A instance of URL
  constructor({ axios, cloudscraper, baseURL, timeout = 10000 }) {
    Object.entries({ axios, cloudscraper, baseURL, timeout }).forEach(([ k, v ]) => {
      this[`_${k}`] = v;
    });
  }

  async get(id) { // eslint-disable-line no-unused-vars
    throw new Error(`${this.constructor.name} should implement async get`);
  }

  get _axiosCrawler() {
    if (!this._crawler) {
      this._crawler = {
        get: async (path, params) => {
          const config = {
            baseURL: this._baseURL.origin,
            timeout: this._timeout,
            ...params,
          };
          try {
            const resp = await this._axios.get(path, config);
            if (resp.status === 200) {
              return resp.data;
            }
            throw new Error(resp.status + ':' + resp.statusText);
          } catch (e) {
            throw e;
          }
        },
      };
    }
    return this._crawler;
  }

  get _cloudscraperCrawler() {
    if (!this._crawler) {
      this._crawler = {
        get: (path) => proxyPy.get(this._baseURL.origin + path),
      };
    }
    return this._crawler;
  }

  get crawler() {
    if (!this._baseURL) {
      throw new Error(`No base url for ${this.constructor.name}`);
    }
    return this._axios ? this._axiosCrawler : this._cloudscraperCrawler;
  }

  _handleError(e) {
    return handleError(e);
  }
}

module.exports = StockProviderServerBase;
