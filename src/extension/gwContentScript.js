import { PATH_TYPE } from './utils/gwURL';
import messageBackground from './utils/messageBackground';

const MS_EXTRACT_WAITING_TIME = 330;

const peExtractor = {

  _extractPrice() {
    console.log('_extractPrice...');
    const deal = document.querySelector('.quotes-info .deal');
    return deal ? { close: parseFloat(deal.textContent.trim()) } : null;
  },

  _extractPEs(callback) {
    const table = document.querySelector('table');
    const cells = table ? Array.from(table.querySelectorAll('tbody > tr')) : [];
    const peValues = cells.map(tr => parseFloat(tr.querySelectorAll('td')[1].textContent)).filter(pe => !Number.isNaN(pe));
    if (peValues.length) {
      callback(peValues);
    } else {
      setTimeout(() => this._extractPEs(callback), MS_EXTRACT_WAITING_TIME);
    }
  },

  extractPEs() {
    if (this._promise) {
      return this._promise;
    }
    console.log('extractPEs...');
    this._promise = new Promise(resolve => this._extractPEs(resolve));
    return this._promise
      .then(data => ({
        DATA_PE: data,
        DATA_PRICE: this._extractPrice(),
      }))
      .finally(() => {
        this._promise = null;
      });
  },
};

const epsExtractor = {

  _extractEPS(callback) {
    const table = document.querySelector('table');
    const cells = table ? Array.from(table.querySelectorAll('tbody > tr')) : [];
    const epsValues = cells.map(cell => {
      const tds = cell.querySelectorAll('td');
      return tds[0].textContent.trim() === '合計' ? null : parseFloat(tds[1].textContent.trim());
    }).filter(eps => typeof eps === 'number');

    if (epsValues.length) {
      callback({ DATA_EPS: epsValues });
    } else {
      setTimeout(() => this._extractEPS(callback), MS_EXTRACT_WAITING_TIME);
    }
  },

  extractEPS() {
    if (this._promise) {
      return this._promise;
    }
    console.log('extractEPS...');
    this._promise = new Promise(resolve => this._extractEPS(resolve));
    return this._promise.finally(() => {
      this._promise = null;
    });
  },
};

window.addEventListener('load', async function () {
  let resp;
  let id;

  resp = await messageBackground({
    cmd: 'CMD_GW_SHOULD_EXTRACT',
    params: {
      type: PATH_TYPE.PE,
      url: window.location.href,
    },
  });
  id = resp.result;
  if (id) {
    const data = await peExtractor.extractPEs();
    await messageBackground({
      cmd: 'CMD_GW_RETURN_DATA',
      params: { data },
    });
    return;
  }

  resp = await messageBackground({
    cmd: 'CMD_GW_SHOULD_EXTRACT',
    params: {
      type: PATH_TYPE.EPS,
      url: window.location.href,
    },
  });
  id = resp.result;
  if (id) {
    const data = await epsExtractor.extractEPS();
    messageBackground({
      cmd: 'CMD_GW_RETURN_DATA',
      params: { data },
    });
  }
});
