import fakeDOMParser from './utils/fakeDOMParser';

import pePage from './data/wantgooPePage';
import pbPage from './data/wantgooPbPage';
import epsPage from './data/wantgooEpsPage';
import dividendPage from './data/wantgooDividendPage';

import WantgooClient from '../stockProvider/WantgooClient';

const EXPECTED_STOCK_DATA = { pe: { in5yrs: { top: 19.37, mid: 15.754999999999999, low: 10.63 }, in3yrs: { top: 19.37, mid: 16.68, low: 14.66 } }, pb: { in5yrs: { top: 4.7, mid: 3.67, low: 3.13 }, in3yrs: { top: 4.7, mid: 3.775, low: 3.5 } }, dividends: [8, 8, 7, 6, 4.5], name: '台積電', price: 282, eps: 12.229999999999999, netValue: 59.87261146496815, id: '2330' };

function fakeAxios() {
  const axios = {
    get: jest.fn(() => (new Promise((resolve) => {
      setTimeout(() => resolve({ data: { pePage, pbPage, epsPage, dividendPage } }), axios.delay || 0);
    }))),
  };
  return axios;
}

function create() {
  const axios = fakeAxios();
  const domParser = fakeDOMParser();
  return {
    axios,
    stockProvider: new WantgooClient({ apiClient: axios, domParser }),
  };
}

function verifyAxios(axios, { stockId, times = 1, noCache = false }) {
  let params;
  if (noCache) params = { noCache };
  expect(axios.get).toBeCalledTimes(times);
  expect(axios.get).nthCalledWith(times, `/stockdata/${stockId}`, { params });
}

describe('WantgooClient', () => {
  it('should return stock data', async () => {
    const stockId = '2330';
    const { axios, stockProvider } = create();
    const data = await stockProvider.get(stockId);
    verifyAxios(axios, { stockId });
    expect(data).toMatchObject(EXPECTED_STOCK_DATA);
  });

  it('should cache stock data', async () => {
    const stockId = '2330';
    const { axios, stockProvider } = create();

    let data = await stockProvider.get(stockId);
    expect(data).toMatchObject(EXPECTED_STOCK_DATA);

    data = await stockProvider.get(stockId);
    expect(data).toMatchObject(EXPECTED_STOCK_DATA);

    verifyAxios(axios, { stockId });
  });

  it('should not cache stock data', async () => {
    const stockId = '2330';
    const { axios, stockProvider } = create();

    let data = await stockProvider.get(stockId);
    expect(data).toMatchObject(EXPECTED_STOCK_DATA);
    verifyAxios(axios, { stockId });

    const noCache = true;
    data = await stockProvider.get(stockId, noCache);
    expect(data).toMatchObject(EXPECTED_STOCK_DATA);
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
});
