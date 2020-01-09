import fakeDOMParser from './utils/fakeDOMParser';

import pePage from './data/gwPePage';
import pbPage from './data/gwPbPage';
import epsPage from './data/gwEpsPage';
import dividendPage from './data/gwDividendPage';

import GwClient from '../stockProvider/GwClient';

const EXPECTED_STOCK_DATA = { pe: { in5yrs: { top: 19.37, mid: 15.754999999999999, low: 10.63 }, in3yrs: { top: 19.37, mid: 16.68, low: 14.66 } }, pb: { in5yrs: { top: 4.7, mid: 3.67, low: 3.13 }, in3yrs: { top: 4.7, mid: 3.775, low: 3.5 } }, dividends: [8, 8, 7, 6, 4.5], name: '台積電', price: 282, eps: 12.229999999999999, netValue: 59.87261146496815 };

const gwClient = new GwClient({ domParser: fakeDOMParser() });

describe('GwClient', () => {
  it('should parse stock data', async () => {
    const data = gwClient.parseData({ pePage, pbPage, epsPage, dividendPage });
    expect(data).toMatchObject(EXPECTED_STOCK_DATA);
  });
});
