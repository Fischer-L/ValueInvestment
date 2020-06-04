import calcProfitRiskValues from '@/utils/calcProfitRiskValues';

const givenLock = (...keys) => keys.reduce((lock, key) => {
  lock[key] = true;
  return lock;
}, {});

describe('calcProfitRiskValues', () => {
  const cases = [
    {
      values: {
        profitPrice: 188.88,
        buyPrice: 168.465,
        riskPrice: 158.258,
        profitRiskRatio: 2,
        reward: 0.121,
      },
      locks: [ 'profitPrice', 'buyPrice', 'riskPrice' ],
    },
    {
      values: {
        profitPrice: 188.88,
        buyPrice: 168.465,
        riskPrice: 158.258,
        profitRiskRatio: 2,
        reward: 0.121,
      },
      locks: [ 'profitPrice', 'buyPrice', 'profitRiskRatio' ],
    },
    {
      values: {
        profitPrice: 188.88,
        buyPrice: 168.465,
        riskPrice: 158.258,
        profitRiskRatio: 2,
        reward: 0.121,
      },
      locks: [ 'profitPrice', 'riskPrice', 'profitRiskRatio' ],
    },
    {
      values: {
        profitPrice: 188.849,
        buyPrice: 168.465,
        riskPrice: 158.273,
        profitRiskRatio: 2,
        reward: 0.121,
      },
      locks: [ 'buyPrice', 'profitRiskRatio', 'reward' ],
    },
    {
      values: {
        profitPrice: 188.879,
        buyPrice: 168.465,
        riskPrice: 158.258,
        profitRiskRatio: 2,
        reward: 0.121,
      },
      locks: [ 'buyPrice', 'riskPrice', 'profitRiskRatio' ],
    },
    {
      values: {
        profitPrice: 188.88,
        buyPrice: 168.492,
        riskPrice: 158.299,
        profitRiskRatio: 2,
        reward: 0.121,
      },
      locks: [ 'profitPrice', 'profitRiskRatio', 'reward' ],
    },
  ];

  cases.forEach(testCase => {
    it('Given ' + testCase.locks.join(', '), () => {
      const lock = givenLock(...testCase.locks);
      const result = calcProfitRiskValues({ ...testCase.values, lock });
      expect(result).toMatchObject(testCase.values);
    });
  });
});
