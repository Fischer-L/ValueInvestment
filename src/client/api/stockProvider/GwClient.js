import { StockDataParserClient } from './StockProviderClient';

class GwClient extends StockDataParserClient {
  parseData({ DATA_EPS, DATA_PE_PB_DIVIDEND }) {
    const dataEps = JSON.parse(DATA_EPS);
    const dataPePbDividend = JSON.parse(DATA_PE_PB_DIVIDEND);
    const eps = this._extractEPS(dataEps);
    const pe = this._extractPE(dataPePbDividend);
    const pb = this._extractPB(dataPePbDividend);
    const dividends = this._extractDividends(dataPePbDividend);
    return {
      pe,
      pb,
      dividends,
      eps,
    };
  }

  _extractEPS(data) {
    return data.map(v => v.beps).slice(0, 4).reduce((quarterly, total) => quarterly + total, 0);
  }

  _extractDividends(data) {
    return data.map(v => v.dividendYield).slice(0, 5);
  }

  _extractPE(data) {
    const values = data.map(v => v.priceToEarningRatio);
    return {
      all: values,
      in5yrs: this._getFeaturedValues(values.slice(0, 60)),
      in3yrs: this._getFeaturedValues(values.slice(0, 30)),
    };
  }

  _extractPB(data) {
    const values = data.map(v => v.priceBookRatio);
    return {
      all: values,
      in5yrs: this._getFeaturedValues(values.slice(0, 60)),
      in3yrs: this._getFeaturedValues(values.slice(0, 30)),
    };
  }

  _getFeaturedValues(values) {
    const sorted = values.filter(v => v > 0).sort((a, b) => b - a);
    const len = sorted.length;
    const top = sorted[0];
    const low = sorted[len - 1];

    let mid = 0;
    const odd = len % 2 === 1;
    if (odd) {
      mid = sorted[Math.ceil(len / 2)];
    } else {
      const mid1 = sorted[len / 2];
      const mid2 = sorted[(len / 2) + 1];
      mid = (mid1 + mid2) / 2;
    }

    return { top, mid, low };
  }
}

export default GwClient;
