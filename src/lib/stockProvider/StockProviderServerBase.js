class StockProviderServerBase {
  // - baseURL: A instance of URL
  constructor({ env, axios, baseURL, timeout = 10000 }) {
    Object.entries({ env, axios, baseURL, timeout }).forEach(([ k, v ]) => {
      this[`_${k}`] = v;
    });
    this._isProd = env === 'production';
  }

  async get(id) { // eslint-disable-line no-unused-vars
    throw new Error(`${this.constructor.name} should implement async get`);
  }

  get crawler() {
    if (!this._baseURL) {
      throw new Error(`No base url for ${this.constructor.name}`);
    }
    if (!this._crawler) {
      this._crawler = this._axios.create({
        baseURL: this._baseURL.toString(),
        timeout: this._timeout,
        headers: {
          Host: this._baseURL.host,
          Origin: this._baseURL.toString(),
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.13; rv:71.0) Gecko/20100101 Firefox/71.0',
        },
      });
    }
    return this._crawler;
  }

  _handleError(e) {
    console.log('\n\n<<<<<<<<<<');
    if (this._isProd) {
      // Log less info to save server resources on the production mode
      const { url, method, headers } = e.config;
      console.error({
        error: e.toString(),
        url,
        method,
        headers,
      });
    } else {
      console.error(e);
    }
    console.log('>>>>>>>>>>\n\n');
    return { error: e.toString() };
  }
}

module.exports = StockProviderServerBase;
