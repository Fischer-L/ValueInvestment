class StockProviderServerBase {
  // - baseURL: A instance of URL
  constructor({ env, cloudscraper, baseURL, timeout = 10000, challenge = false }) {
    Object.entries({ env, cloudscraper, baseURL, timeout, challenge }).forEach(([ k, v ]) => {
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
      this._crawler = {
        get: (path) => {
          const options = {
            uri: this._baseURL.origin + path,
            cloudflareMaxTimeout: this._timeout,
          };
          if (this._challenge) {
            if (!this._challengeRequest) {
              this._challengeRequest = this._cloudscraper.get(this._baseURL.origin);
            }
          } else {
            this._challengeRequest = Promise.resolve();
          }
          return this._challengeRequest.then(() => this._cloudscraper.get(options));
        },
      };
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
