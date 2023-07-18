import runJobs from './utils/runJobs';
import { PATH_TYPE } from './utils/gwURL';
import localVarsOf from './utils/localVarsOf';
import messageBackground from './utils/messageBackground';

const MS_EXTRACT_WAITING_TIME = 330;

const peExtractor = {
  id: 'gw-peExtractor',

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

  isTargetPage() {
    return true;
  },

  async init() {
    const resp = await messageBackground({
      cmd: 'CMD_GW_SHOULD_EXTRACT',
      params: {
        type: PATH_TYPE.PE,
        url: window.location.href,
      },
    });

    const id = resp.result;
    if (id) {
      const data = await this.extractPEs();
      await messageBackground({
        cmd: 'CMD_GW_RETURN_DATA',
        params: { data },
      });

    }
  },
};

const epsExtractor = {
  id: 'gw-epsExtractor',

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

  isTargetPage() {
    return true;
  },

  async init() {
    const resp = await messageBackground({
      cmd: 'CMD_GW_SHOULD_EXTRACT',
      params: {
        type: PATH_TYPE.EPS,
        url: window.location.href,
      },
    });

    const id = resp.result;
    if (id) {
      const data = await this.extractEPS();
      messageBackground({
        cmd: 'CMD_GW_RETURN_DATA',
        params: { data },
      });
    }
  },
};

const rmBottomBannerJob = {
  id: 'gw-rmBottomBannerJob',

  _rmAds() {
    const localVars = this._localVars;
    if (localVars.observer) {
      return;
    }

    localVars.observer = new MutationObserver(() => {
      const ad = document.querySelector('.technical-shortcut-wrap');
      if (ad) {
        ad.remove();
        localVars.observer.disconnect();
        localVars.observer = null;
      }
    });
    localVars.observer.observe(document.body, { childList: true, subtree: true });
  },

  isTargetPage() {
    return true;
  },

  init() {
    this._localVars = localVarsOf('gw-rmBottomBannerJob', {
      observer: null,
    });
    if (this._localVars.init) {
      return;
    }
    if (this.isTargetPage()) {
      this._localVars.init = true;
      this._rmAds();
    }
  },
};

runJobs(peExtractor, epsExtractor, rmBottomBannerJob);
