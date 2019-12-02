const GwServer = require('../lib/stockProvider/GwServer');

let provider = null;

function getStockProvider({ env, cloudscraper }) {
  if (!provider) {
    provider = new GwServer({ env, cloudscraper });
  }
  return provider;
}

module.exports = getStockProvider;
