import calcProfitRiskValues from '../calcProfitRiskValues';

const fakeValues = () => ({
  profitPrice: 130,
  buyPrice: 100,
  riskPrice: 90,
  profitRiskRatio: 3,
  reward: 0.3,
});

const givenLock = (...keys) => keys.reduce((lock, key) => {
  lock[key] = true;
  return lock;
}, {});

describe('calcProfitRiskValues', () => {
  const cases = [
    [ 'profitPrice', 'buyPrice', 'riskPrice' ],
    [ 'profitPrice', 'buyPrice', 'profitRiskRatio' ],
    [ 'profitPrice', 'riskPrice', 'profitRiskRatio' ],
    [ 'buyPrice', 'riskPrice', 'profitRiskRatio' ],
    [ 'buyPrice', 'profitRiskRatio', 'reward' ],
    [ 'profitPrice', 'profitRiskRatio', 'reward' ],
  ];

  cases.forEach(keys => {
    it('Given ' + keys.join(', '), () => {
      const values = fakeValues();
      const lock = givenLock(...keys);
      const result = calcProfitRiskValues({ ...values, lock });
      expect(result).toMatchObject(values);
    });
  });
});
