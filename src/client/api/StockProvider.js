// The stock data format
// {
//   id: '1234',
//   name: 'Stock',
//   price: 100,
//   eps: 12,
//   netValue: 30,
//   dividends: [5, 4.5, 4.8, 4.2, 4],
//   pe: {
//     in5yrs: {
//       top: 50,
//       mid: 30,
//       low: 10,
//     },
//     in3yrs: {
//       top: 30,
//       mid: 25,
//       low: 20,
//     },
//   },
//   pb: {
//     in5yrs: {
//       top: 1.5,
//       mid: 1.2,
//       low: 0.8,
//     },
//     in3yrs: {
//       top: 1.2,
//       mid: 1.1,
//       low: 1,
//     },
//   },
// }
class StockProvider {
  constructor({ apiClient, domParser }) {
    this._stocks = {};
    this._domParser = domParser;
    this._api = apiClient;
  }

  get(id, noCache = false) {
    let params;
    if (noCache === true) {
      params = { noCache };
      this._stocks[id] = null;
    }
    if (!this._stocks[id]) {
      this._stocks[id] = {};
      this._stocks[id].promise = new Promise(async (resolve, reject) => {
        try {
          const { data } = await this._api.get(`/stockdata/${id}`, { params });
          if (data.error) throw data.error;
          this._stocks[id].data = this._extractData(data);
          this._stocks[id].data.id = id;
          resolve(this._stocks[id].data);
        } catch (e) {
          console.error(e);
          reject(e);
        }
      });
    }
    return this._stocks[id].promise;
  }

  _extractData({ pePage, pbPage, epsPage, dividendPage }) {
    const pe = this._extractPEorPB(pePage);
    const pb = this._extractPEorPB(pbPage);
    const dividends = this._extractDividends(dividendPage).slice(0, 5);
    const { name, price, eps, netValue } = this._extractBasicInfo(epsPage);
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

  _parseDomFromString(htmlString) {
    return this._domParser.parseFromString(htmlString, 'text/html');
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

  _extractPEorPB(page) {
    const doc = this._parseDomFromString(page);
    const table = doc.querySelector('table.tb.rw4n.tbhl');
    const rows = Array.from(table.querySelectorAll('tr')).slice(1);
    const values = rows.map(tr => +tr.children[1].textContent).filter(v => !Number.isNaN(v));
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

  _extractDividends(page) {
    const doc = this._parseDomFromString(page);
    const table = doc.querySelector('table.tb.rw5n.tbhl');
    const rows = Array.from(table.querySelectorAll('tr')).slice(1);
    return rows.map(tr => +tr.children[3].textContent);
  }
}

export default StockProvider;
