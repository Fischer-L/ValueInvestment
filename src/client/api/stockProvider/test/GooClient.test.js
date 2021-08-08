import fakeDOMParser from './utils/fakeDOMParser';
import dividendPolicyPage from './data/gooDividendPolicyPage';
import GooClient from '../GooClient';

const EXPECTED_DATA = {
  name: '台積電',
  cashDivs: [ 7.75, 10, 12.5, 8, 7 ],
  cashPayoutRatio: {
    in5yrs: {
      avg: 0.5746,
      smoothAvg: 0.5409999999999999,
    },
  },
};

const gooClient = new GooClient({ domParser: fakeDOMParser() });

describe('GooClient', () => {
  it('should parse name', async () => {
    const data = gooClient.parseData({ dividendPolicyPage });
    expect(data.name).toBe(EXPECTED_DATA.name);
  });

  it('should parse cash dividends data', async () => {
    const data = gooClient.parseData({ dividendPolicyPage });
    expect(data.cashDivs).toMatchObject(EXPECTED_DATA.cashDivs);
  });

  it('should parse dividend policy data', async () => {
    const data = gooClient.parseData({ dividendPolicyPage });
    expect(data.cashPayoutRatio).toMatchObject(EXPECTED_DATA.cashPayoutRatio);
  });
});
