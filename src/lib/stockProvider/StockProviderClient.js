// The stock data format
// {
//   id: '1234',
//   name: 'Stock',
//   price: 100,
//   eps: 12,
//   netValue: 30,
//   dividends: [
//     5, 4.5, 4.8, 4.2, 4,
//   ],
//   dividendPolicy: {
//     in5yrs: {
//       avg: 0.66,
//       smoothAvg: 0.68 // Rid of the highest and lowest rate
//     },
//   },
//   pe: {
//     in5yrs: {
//       top: 50,
//       mid: 30,
//       low: 10,
//     },
//     in3yrs: {
//       top: 30,
//       mid: 25,
//       low: 20,
//     },
//   },
//   pb: {
//     in5yrs: {
//       top: 1.5,
//       mid: 1.2,
//       low: 0.8,
//     },
//     in3yrs: {
//       top: 1.2,
//       mid: 1.1,
//       low: 1,
//     },
//   },
// }
class StockProviderClient {
  constructor({ apiClient, dataParsers }) {
    this._stocks = {};
    this._api = apiClient;
    this._dataParsers = dataParsers;
  }

  get({ id, extensionId, noCache = false }) {
    if (noCache === true) {
      this._stocks[id] = null;
    }

    if (!this._stocks[id]) {
      this._stocks[id] = {};
      this._stocks[id].promise = new Promise(async (resolve, reject) => {
        try {
          const data = await this._fetch(id, extensionId);
          if (data.error) throw data.error;

          this._stocks[id].data = Object.entries(this._dataParsers).reduce((_data, [ key, parser ]) => ({
            ..._data,
            ...parser.parseData(data.result[key]),
          }), {});
          this._stocks[id].data.id = id;

          resolve(this._stocks[id].data);
        } catch (e) {
          this._stocks[id] = null;
          console.error(e);
          reject(e);
        }
      });
    }
    return this._stocks[id].promise;
  }

  _fetch(id, extensionId) {
    return new Promise((resolve, reject) => {
      if (extensionId) {
        chrome.runtime.sendMessage(extensionId, { cmd: 'CMD_STOCK_DATA', params: { id } }, data => resolve(data));
      } else {
        reject(new Error('Lack of Chrome extension id'));
      }
    });
  }
}

class StockDataParserClient {
  constructor({ domParser }) {
    this._domParser = domParser;
  }

  _parseDomFromString(htmlString) {
    return this._domParser.parseFromString(htmlString, 'text/html');
  }

  parseData(data) { // eslint-disable-line no-unused-vars
    throw new Error(`${this.constructor.name} should implement parseData`);
  }
}

export { StockProviderClient, StockDataParserClient };
