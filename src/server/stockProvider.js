const WantgooServer = require('../lib/stockProvider/WantgooServer');

let provider = null;

function getStockProvider({ env, axios }) {
  if (!provider) {
    provider = new WantgooServer({ env, axios });
  }
  return provider;
}

module.exports = getStockProvider;
