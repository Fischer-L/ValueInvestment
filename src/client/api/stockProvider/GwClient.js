import { StockDataParserClient } from './StockProviderClient';

class GwClient extends StockDataParserClient {
  parseData({ epsPage, DATA_PE_PB_DIVIDEND }) {
    const dataPePbDividend = JSON.parse(DATA_PE_PB_DIVIDEND);
    const pe = this._extractPE(dataPePbDividend);
    const pb = this._extractPB(dataPePbDividend);
    const dividends = this._extractDividends(dataPePbDividend).slice(0, 5);
    // TODO: Upgrade EPS data
    const { name = 'TODO_EPS_DATA', price = 168, eps = 10, netValue = 10 } = epsPage ? this._extractBasicInfo(epsPage) : {};
    return {
      pe,
      pb,
      dividends,
      name,
      price,
      eps,
      netValue,
    };
  }

  _extractBasicInfo(epsPage) {
    const doc = this._parseDomFromString(epsPage);
    const price = +doc.querySelector('.price').textContent;
    const name = doc.querySelector('.idx-name').childNodes[0].textContent.trim();
    const currentPB = +doc.querySelector('ul.idx-data-pri').children[6].textContent.substr(3);
    return {
      name,
      price,
      eps: this._extractEPS(doc),
      netValue: price / currentPB,
    };
  }

  _extractEPS(epsPageDoc) {
    const table = epsPageDoc.querySelector('table.tb.tbhl');
    const rows = Array.from(table.querySelectorAll('tr'))
      .slice(1, 10).filter(row => !row.classList.contains('tal'));
    return rows.slice(0, 4).reduce((eps, row) => eps + parseFloat(row.children[1].textContent), 0);
  }

  _extractDividends(data) {
    return data.map(v => v.dividendYield);
  }

  _extractPE(data) {
    const values = data.map(v => v.priceToEarningRatio);
    return {
      in5yrs: this._getFeaturedValues(values.slice(0, 60)),
      in3yrs: this._getFeaturedValues(values.slice(0, 30)),
    };
  }

  _extractPB(data) {
    const values = data.map(v => v.priceBookRatio);
    return {
      in5yrs: this._getFeaturedValues(values.slice(0, 60)),
      in3yrs: this._getFeaturedValues(values.slice(0, 30)),
    };
  }

  _getFeaturedValues(values) {
    const sorted = values.slice().sort((a, b) => b - a);
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
