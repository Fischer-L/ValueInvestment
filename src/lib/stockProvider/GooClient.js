import { StockDataParserClient } from './StockProviderClient';

const YEARS_TO_EXTRACT = 8;

const sumOf = nums => nums.reduce((sum, n) => sum + n, 0);

class GooClient extends StockDataParserClient {

  parseData({ dividendPolicyPage }) {
    const doc = this._parseDomFromString(dividendPolicyPage);
    const table = doc.querySelector('#divDetail table');
    const tBodies = Array.from(table.tBodies);
    const dividendRates = [];
    while (tBodies.length && dividendRates.length < YEARS_TO_EXTRACT) {
      dividendRates.push(...this._extractRates(tBodies.shift()));
    }

    const ratesIn5yrs = dividendRates.slice(0, 5);
    const avg = sumOf(ratesIn5yrs) / ratesIn5yrs.length;

    const smoothRatesIn5yrs = dividendRates.slice(0, 7);
    if (smoothRatesIn5yrs.length >= 4) {
      smoothRatesIn5yrs.sort();
      smoothRatesIn5yrs.pop();
      smoothRatesIn5yrs.shift();
    }
    const smoothAvg = sumOf(smoothRatesIn5yrs) / smoothRatesIn5yrs.length;

    return {
      dividendPolicy: {
        in5yrs: { avg, smoothAvg },
      },
    };
  }

  _extractRates(tBody) {
    const trs = Array.from(tBody.querySelectorAll('tr'));
    let yrNow = (new Date()).getFullYear();
    const yrEnd = yrNow - YEARS_TO_EXTRACT + 1;
    const rates = [];
    while (trs.length && yrNow >= yrEnd) {
      const tr = trs.shift();
      const tds = tr.querySelectorAll('td');
      if (yrNow === parseInt(tds[0].textContent, 10)) {
        const rate = parseFloat(tds[21].textContent);
        if (!Number.isNaN(rate)) {
          rates.push(rate / 100);
        }
        yrNow--;
      }
    }
    return rates;
  }
}

export default GooClient;
