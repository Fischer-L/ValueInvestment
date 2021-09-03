import { StockDataParserClient } from './StockProviderClient';

class GwClient extends StockDataParserClient {
  parseData({ DATA_PRICE, DATA_EPS, DATA_PE }) {
    const eps = this._extractEPS(DATA_EPS);
    const pe = this._extractPE(DATA_PE);
    // const pb = this._extractPB(dataPb); // TODO: Before fixing the PB data source, skip always
    return {
      pe,
      eps,
      price: DATA_PRICE.close,
      // pb: TODO: Before fixing the PB data source, skip always
    };
  }

  _extractEPS(data) {
    return data.slice(0, 4).reduce((quarterly, total) => quarterly + total, 0);
  }

  _extractPE(data) {
    return {
      all: data,
      in5yrs: this._getFeaturedValues(data.slice(0, 60)),
      in3yrs: this._getFeaturedValues(data.slice(0, 30)),
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
