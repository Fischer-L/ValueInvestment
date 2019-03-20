let isProd = false;
let crawler = null;

const stockProvider = {
  async get(id) {
    try {
      const [ espPage, pbsPage, dividendsPage ] = await Promise.all([
        this._getPage('eps', id),
        this._getPage('pbs', id),
        this._getPage('dividends', id),
      ]);
      return { espPage, pbsPage, dividendsPage };
    } catch (e) {
      return this._handleError(e);
    }
  },

  async _getPage(pageType, id) {
    let path = '';
    switch (pageType) {
      case 'eps':
        path = `/stock/report/value?types=1&stockno=${id}`;
        break;

      case 'pbs':
        path = `/stock/report/value?types=2&stockno=${id}`;
        break;

      case 'dividends':
        path = `/stock/report/value?types=2&stockno=${id}`;
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
