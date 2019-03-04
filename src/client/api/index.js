export function getFakeData() {
  return {
    id: '1234',
    price: 100,
    netValue: 30,
    dividends: [5, 4.5, 4.8, 4.2, 4],
    eps: {
      in5yrs: {
        top: 50,
        mid: 30,
        low: 10,
      },
      in3yrs: {
        top: 30,
        mid: 25,
        low: 20,
      },
    },
    pbs: {
      in5yrs: {
        top: 1.5,
        mid: 1.2,
        low: 0.8,
      },
      in3yrs: {
        top: 1.2,
        mid: 1.1,
        low: 1,
      },
    },
  };
}

const stockProvider = {
  async get(stockId) {
    return getFakeData(stockId);
  },
};

export default stockProvider;
