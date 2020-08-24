import fakeDOMParser from './utils/fakeDOMParser';
import dividendPolicyPage from './data/gooDividendPolicyPage';
import GooClient from '../GooClient';

const EXPECTED_DATA = {
  dividendPolicy: {
    in5yrs: {
      avg: 0.5548,
      smoothAvg: 0.5132,
    },
  },
};

const gooClient = new GooClient({ domParser: fakeDOMParser() });

describe('GooClient', () => {
  it('should parse dividend policy data', async () => {
    const data = gooClient.parseData({ dividendPolicyPage });
    expect(data).toMatchObject(EXPECTED_DATA);
  });
});
