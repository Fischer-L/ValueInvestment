const WantgooServer = require('../lib/stockProvider/WantgooServer');

let provider = null;

function getStockProvider({ env, cloudscraper }) {
  if (!provider) {
    provider = new WantgooServer({ env, cloudscraper });
  }
  return provider;
}

module.exports = getStockProvider;
