/* eslint react/no-this-in-sfc: off */
import DOMAINS from '~/utils/domains';
import CacheProvider from '~/utils/cacheProvider';
import gwURL, { PATH_TYPE } from './utils/gwURL';

const gooServer = {
  baseURL: DOMAINS.gi,

  async get(id) {
    const path = ['/', 'S', 't', 'o', 'c', 'k', 'I', 'n', 'f', 'o', '/', 'S', 't', 'o', 'c', 'k', 'D', 'i', 'v', 'i', 'd', 'e', 'n', 'd', 'P', 'o', 'l', 'i', 'c', 'y', '.', 'a', 's', 'p', '?', 'S', 'T', 'O', 'C', 'K', '_', 'I', 'D', '=', '{id}'];
    const resp = await fetch(this.baseURL + path.join('').replace('{id}', id));
    const result = { dividendPolicyPage: await resp.text() };
    return result;
  },
};

const gwServer = {
  _cleanUp() {
    if (this._tabs) {
      this._tabs.forEach(tab => chrome.tabs.remove(tab.id));
    }
    if (this._timer) {
      clearTimeout(this._timer);
    }
    this._data = {
      DATA_PE: null,
      DATA_EPS: null,
      DATA_PRICE: null,
    };
    this._typesExtracted = this._timer = this._id = this._tabs = this._getPromise = null;
  },

  _timeoutIfTooLong() {
    if (this._timer) {
      clearTimeout(this._timer);
    }
    this._timer = setTimeout(() => {
      if (this._getPromise) {
        this._getPromise.reject(new Error(`gw tab timeout: id= ${this._id}`));
      }
    }, 15 * 1000);
  },

  _openGwForData() {
    this._tabs = [];

    chrome.tabs.create({
      url: gwURL(PATH_TYPE.PE, this._id),
      index: 999, // Wanna be the last one
      active: false,
    }, tab => {
      this._tabs.push(tab);
    });
    chrome.tabs.create({
      url: gwURL(PATH_TYPE.EPS, this._id),
      index: 999, // Wanna be the last one
      active: false,
    }, tab => {
      this._tabs.push(tab);
    });
  },

  async get(id) {
    if (this._id === id && this._getPromise) {
      return this._getPromise.promise;
    }
    this._cleanUp();
    this._id = id;

    this._getPromise = {};
    this._getPromise.promise = new Promise((resolve, reject) => {
      this._getPromise.resolve = resolve;
      this._getPromise.reject = reject;
      this._openGwForData(this._id);
      this._timeoutIfTooLong();
    });
    return this._getPromise.promise.finally(() => this._cleanUp());
  },

  shouldExtract({ type, url }) {
    if (!this._typesExtracted) {
      this._typesExtracted = {};
    }
    if (!this._typesExtracted[type] && gwURL(type, this._id) === url) {
      this._typesExtracted[type] = true;
      return this._id;
    }
    return null;
  },

  onDataFromContentScript({ DATA_PE, DATA_EPS, DATA_PRICE }) {
    if (DATA_PE) {
      this._data.DATA_PE = DATA_PE;
    }
    if (DATA_EPS) {
      this._data.DATA_EPS = DATA_EPS;
    }
    if (DATA_PRICE) {
      this._data.DATA_PRICE = DATA_PRICE;
    }
    if (Object.values(this._data).every(Boolean)) {
      this._getPromise.resolve(this._data);
    }
  },
};

const stockData = {

  _cache: new CacheProvider(),

  _cleanUp() {
    this._id = this._sendResp = null;
  },

  async get(id, sendResp) {
    try {
      if (this._sendResp) {
        this._sendResp({ error: `Stop fetching ${this._id} and start fetching ${id}` });
      }
      this._id = id;
      this._sendResp = sendResp;

      let result = this._cache.get(this._id);
      if (!result) {
        const [ gooStockData, gwStockData ] = await Promise.all([ gooServer.get(id), gwServer.get(id) ]);
        result = { gooStockData, gwStockData };
        this._cache.set(this._id, result);
      }
      this._sendResp({ result });
    } catch (e) {
      sendResp({ error: e.toString() });
    } finally {
      this._cleanUp();
    }
  },
};

chrome.runtime.onMessage.addListener((msg, sender, sendResp) => {
  const { cmd, params } = msg;
  switch (cmd) {
    case 'CMD_STOCK_DATA':
      stockData.get(params.id, sendResp);
      break;

    case 'CMD_GW_SHOULD_EXTRACT':
      sendResp({ result: gwServer.shouldExtract(params) });
      break;

    case 'CMD_GW_RETURN_DATA':
      gwServer.onDataFromContentScript(params.data);
      sendResp(true);
      break;

    case 'CMD_STOCK_TECHNICAL':
      chrome.tabs.create({
        url: gwURL(PATH_TYPE.TECHNICAL, params.stockId),
        index: 1,
        active: true,
      });
      sendResp(true);
      break;
  }
  return true;
});
