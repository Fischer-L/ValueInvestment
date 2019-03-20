let isProd = false;
let crawler = null;

const stockProvider = {
  async get(id) {
    try {
      const [ pePage, pbPage, dividendPage ] = await Promise.all([
        this._getPage('pe', id),
        this._getPage('pb', id),
        this._getPage('dividend', id),
      ]);
      return { pePage, pbPage, dividendPage };
    } catch (e) {
      return this._handleError(e);
    }
  },

  async _getPage(pageType, id) {
    let path = '';
    switch (pageType) {
      case 'pe':
        path = `/stock/report/value?types=1&stockno=${id}`;
        break;

      case 'pb':
        path = `/stock/report/value?types=2&stockno=${id}`;
        break;

      case 'dividend':
        path = `/stock/report/basic_dp?stockno=${id}`;
        break;
    }
    const { data } = await crawler.get(path);
    return data;
  },

  _handleError(e) {
    console.log('\n\n<<<<<<<<<<');
    if (isProd) {
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
  },
};

function getStockProvider({ env, axios }) {
  if (!crawler) {
    isProd = env === 'production';
    crawler = axios.create({
      baseURL: 'https://www.wantgoo.com/',
      timeout: 10000,
    });
  }
  return stockProvider;
}

module.exports = getStockProvider;
