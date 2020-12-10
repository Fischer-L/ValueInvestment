// The stock data format
// {
//   id: '1234',
//   name: 'Stock',
//   price: 100,
//   eps: 12,
//   bookValue: 30,
//   cashDivs: [
//     5, 4.5, 4.8, 4.2, 4,
//   ],
//   cashPayoutRatio: {
//     in5yrs: {
//       avg: 0.66,
//       smoothAvg: 0.68 // Rid of the highest and lowest rate
//     },
//   },
//   pe: {
//     all: [ 10, 11, 12, ... ],
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
//     all: [ 1, 1.1, 1.2, ... ],
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
  constructor({ apiClient, extensionClient, dataParsers }) {
    this._names = {};
    this._stocks = {};
    this._api = apiClient;
    this._extension = extensionClient;
    this._dataParsers = dataParsers;
  }

  async getName(id) {
    if (!this._names[id]) {
      const { data } = await this._api.get(`/stockinfo/${id}`);
      if (!data || !data.name) {
        throw new Error(`Find no name of ${id}`);
      } else if (data.error) {
        throw data.error;
      }
      this._names[id] = data.name;
    }
    return this._names[id];
  }

  async get(id, noCache = false) {
    if (noCache === true) {
      this._stocks[id] = null;
    }

    if (this._stocks[id]) {
      return this._stocks[id].promise;
    }
    this._stocks[id] = {};

    this._stocks[id].promise = new Promise(async resolve => {
      try {
        const rawData = await this._fetch(id);
        if (!rawData) {
          // Maybe no extension. This is expected so simply return null.
          resolve(null);
          return;
        }
        if (rawData.error) {
          throw rawData.error;
        }

        const data = Object.entries(this._dataParsers).reduce((_data, [ key, parser ]) => ({
          ..._data,
          ...parser.parseData(rawData.result[key]),
        }), {});

        data.id = id;
        data.bookValue = data.price / data.pb.all[0];

        this._stocks[id].data = data;
        resolve(this._stocks[id].data);
      } catch (e) {
        this._stocks[id] = null;
        console.error(e);
        resolve(null);
      }
    });
    return this._stocks[id].promise;
  }

  _fetch(id) {
    return this._extension.talkToExtension({ cmd: 'CMD_STOCK_DATA', params: { id } });
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
