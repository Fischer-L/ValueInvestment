import { StockProviderClient, StockDataParserClient } from '../stockProvider/StockProviderClient';

const FAKE_DATA = { fake: 123 };

function fakeAxios() {
  const axios = {
    get: jest.fn(() => (new Promise((resolve) => {
      setTimeout(() => resolve({ data: FAKE_DATA }), axios.delay || 0);
    }))),
  };
  return axios;
}

function fakeDataParser(extra) {
  const parser = new StockDataParserClient({});
  parser.parseData = jest.fn(data => Object.assign({}, data, extra));
  return parser;
}

function create(dataParsers = [ fakeDataParser() ]) {
  const axios = fakeAxios();
  return {
    axios,
    stockProvider: new StockProviderClient({ apiClient: axios, dataParsers }),
  };
}

function verifyAxios(axios, { stockId, times = 1, noCache = false }) {
  let params;
  if (noCache) params = { noCache };
  expect(axios.get).toBeCalledTimes(times);
  expect(axios.get).nthCalledWith(times, `/stockdata/${stockId}`, { params });
}

describe('StockProviderClient', () => {
  it('should return stock data', async () => {
    const stockId = '2330';
    const { axios, stockProvider } = create();
    const data = await stockProvider.get(stockId);
    verifyAxios(axios, { stockId });
    expect(data).toMatchObject({ ...FAKE_DATA, id: stockId });
  });

  it('should cache stock data', async () => {
    const stockId = '2330';
    const { axios, stockProvider } = create();

    let data = await stockProvider.get(stockId);
    expect(data).toMatchObject({ ...FAKE_DATA, id: stockId });

    data = await stockProvider.get(stockId);
    expect(data).toMatchObject({ ...FAKE_DATA, id: stockId });

    verifyAxios(axios, { stockId });
  });

  it('should not cache stock data', async () => {
    const stockId = '2330';
    const { axios, stockProvider } = create();

    let data = await stockProvider.get(stockId);
    expect(data).toMatchObject({ ...FAKE_DATA, id: stockId });
    verifyAxios(axios, { stockId });

    const noCache = true;
    data = await stockProvider.get(stockId, noCache);
    expect(data).toMatchObject({ ...FAKE_DATA, id: stockId });
    verifyAxios(axios, { stockId, noCache, times: 2 });
  });

  it('should not dispatch multiple api requests if there is an on-going request', async () => {
    const stockId = '2330';
    const { axios, stockProvider } = create();

    axios.delay = 1000;
    stockProvider.get(stockId);

    axios.delay = 0;
    stockProvider.get(stockId);

    verifyAxios(axios, { stockId });
  });

  it('should accept multiple stock data parsers', async () => {
    const stockId = '2330';
    const { axios, stockProvider } = create([
      fakeDataParser(), fakeDataParser({ a: 567 }),
    ]);
    const data = await stockProvider.get(stockId);
    verifyAxios(axios, { stockId });
    expect(data).toMatchObject({ ...FAKE_DATA, a: 567, id: stockId });
  });
});
