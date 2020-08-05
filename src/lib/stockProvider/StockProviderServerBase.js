class StockProviderServerBase {
  // - baseURL: A instance of URL
  constructor({ env, axios, cloudscraper, baseURL, timeout = 10000 }) {
    if (cloudscraper) {
      throw new Error('Now only accept axios');
    }
    Object.entries({ env, axios, cloudscraper, baseURL, timeout }).forEach(([ k, v ]) => {
      this[`_${k}`] = v;
    });
    this._isProd = env === 'production';
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
        get: (path, params) => {
          const options = {
            uri: this._baseURL.origin + path,
            cloudflareMaxTimeout: this._timeout,
            ...params,
          };
          if (!this._challengeRequest) {
            this._challengeRequest = this._cloudscraper.get(this._baseURL.origin);
          }
          return this._challengeRequest.then(() => this._cloudscraper.get(options));
        },
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
