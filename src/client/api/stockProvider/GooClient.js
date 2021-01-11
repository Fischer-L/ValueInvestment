import { StockDataParserClient } from './StockProviderClient';

const sumOf = nums => nums.reduce((sum, n) => sum + n, 0);

class GooClient extends StockDataParserClient {

  parseData({ dividendPolicyPage }) {
    const doc = this._parseDomFromString(dividendPolicyPage);
    const rows = this._extracTableRows(doc, 8);
    return {
      name: this._extractName(doc),
      cashDivs: this._extractCashDivs(rows.slice(0, 5)),
      cashPayoutRatio: this._extractCashPayoutRatio(rows),
    };
  }

  _extractName(doc) {
    return doc.title.split(' ')[1];
  }

  _extractCashDivs(tableRows) {
    return tableRows
      .map(tr => {
        const div = parseFloat(tr.querySelectorAll('td')[3].textContent);
        return Number.isNaN(div) ? 0 : div;
      });
  }

  _extractCashPayoutRatio(tableRows) {
    const ratios = tableRows
      .map(tr => {
        const ratio = parseFloat(tr.querySelectorAll('td')[21].textContent);
        return Number.isNaN(ratio) || ratio <= 0 ? null : ratio / 100;
      })
      .filter(ratio => ratio !== null);

    const ratiosIn5yrs = ratios.slice(0, 5);
    const avg = sumOf(ratiosIn5yrs) / ratiosIn5yrs.length;

    const smoothRatiosIn5yrs = ratios.slice(0, 7);
    if (smoothRatiosIn5yrs.length >= 4) {
      smoothRatiosIn5yrs.sort();
      smoothRatiosIn5yrs.pop();
      smoothRatiosIn5yrs.shift();
    }
    const smoothAvg = sumOf(smoothRatiosIn5yrs) / smoothRatiosIn5yrs.length;

    return {
      in5yrs: { avg, smoothAvg },
    };
  }

  _extracTableRows(doc, yearsToExtract) {
    const rows = [];
    const tBodies = Array.from(doc.querySelector('#divDetail table').tBodies);

    while (yearsToExtract && tBodies.length) {
      const tBody = tBodies.shift();
      const trs = Array.from(tBody.querySelectorAll('tr'));
      while (yearsToExtract && trs.length) {
        const tr = trs.shift();
        const tds = tr.querySelectorAll('td');
        if (!Number.isNaN(parseInt(tds[0].textContent, 10))) {
          rows.push(tr);
          yearsToExtract--;
        }
      }
    }

    return rows;
  }
}

export default GooClient;
