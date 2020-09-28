import { calcLongProfitRiskValues, calcShortProfitRiskValues } from '@/utils/calcProfitRiskValues';

const givenLock = (...keys) => keys.reduce((lock, key) => {
  lock[key] = true;
  return lock;
}, {});

describe('calcLongProfitRiskValues', () => {
  const cases = [
    {
      values: {
        profitPrice: 188.88,
        executionPrice: 168.465,
        riskPrice: 158.258,
        profitRiskRatio: 2,
        reward: 0.121,
      },
      locks: [ 'profitPrice', 'executionPrice', 'riskPrice' ],
    },
    {
      values: {
        profitPrice: 188.88,
        executionPrice: 168.465,
        riskPrice: 158.258,
        profitRiskRatio: 2,
        reward: 0.121,
      },
      locks: [ 'profitPrice', 'executionPrice', 'profitRiskRatio' ],
    },
    {
      values: {
        profitPrice: 188.88,
        executionPrice: 168.465,
        riskPrice: 158.258,
        profitRiskRatio: 2,
        reward: 0.121,
      },
      locks: [ 'profitPrice', 'riskPrice', 'profitRiskRatio' ],
    },
    {
      values: {
        profitPrice: 188.849,
        executionPrice: 168.465,
        riskPrice: 158.273,
        profitRiskRatio: 2,
        reward: 0.121,
      },
      locks: [ 'executionPrice', 'profitRiskRatio', 'reward' ],
    },
    {
      values: {
        profitPrice: 188.879,
        executionPrice: 168.465,
        riskPrice: 158.258,
        profitRiskRatio: 2,
        reward: 0.121,
      },
      locks: [ 'executionPrice', 'riskPrice', 'profitRiskRatio' ],
    },
    {
      values: {
        profitPrice: 188.88,
        executionPrice: 168.492,
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
      const result = calcLongProfitRiskValues({ ...testCase.values, lock });
      expect(result).toMatchObject(testCase.values);
    });
  });
});

describe('calcShortProfitRiskValues', () => {
  const cases = [
    {
      values: {
        profitPrice: 148.258,
        executionPrice: 168.465,
        riskPrice: 178.88,
        profitRiskRatio: 1.94,
        reward: 0.12,
      },
      locks: [ 'profitPrice', 'executionPrice', 'riskPrice' ],
    },
    {
      values: {
        profitPrice: 148.258,
        executionPrice: 168.465,
        riskPrice: 178.881,
        profitRiskRatio: 1.94,
        reward: 0.12,
      },
      locks: [ 'profitPrice', 'executionPrice', 'profitRiskRatio' ],
    },
    {
      values: {
        profitPrice: 148.258,
        executionPrice: 168.464,
        riskPrice: 178.88,
        profitRiskRatio: 1.94,
        reward: 0.12,
      },
      locks: [ 'profitPrice', 'riskPrice', 'profitRiskRatio' ],
    },
    {
      values: {
        profitPrice: 148.257,
        executionPrice: 168.464,
        riskPrice: 178.88,
        profitRiskRatio: 1.94,
        reward: 0.12,
      },
      locks: [ 'executionPrice', 'riskPrice', 'profitRiskRatio' ],
    },
    {
      values: {
        profitPrice: 148.257,
        executionPrice: 168.464,
        riskPrice: 178.88,
        profitRiskRatio: 1.94,
        reward: 0.12,
      },
      locks: [ 'executionPrice', 'riskPrice', 'profitRiskRatio' ],
    },
    {
      values: {
        profitPrice: 148.257,
        executionPrice: 168.474,
        riskPrice: 178.895,
        profitRiskRatio: 1.94,
        reward: 0.12,
      },
      locks: [ 'profitPrice', 'profitRiskRatio', 'reward' ],
    },
  ];

  cases.forEach(testCase => {
    it('Given ' + testCase.locks.join(', '), () => {
      const lock = givenLock(...testCase.locks);
      const result = calcShortProfitRiskValues({ ...testCase.values, lock });
      expect(result).toMatchObject(testCase.values);
    });
  });
});
