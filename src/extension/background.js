import DOMAINS from '~/utils/domains';

class GwServer {
  constructor() {
    this.baseURL = DOMAINS.gw;
  }

  async get(id) {
    try {
      const [ DATA_PRICE, DATA_EPS, DATA_PE_PB ] = await Promise.all([
        this._getPage('DATA_PRICE', id),
        this._getPage('DATA_EPS', id),
        this._getPage('DATA_PE_PB', id),
      ]);
      return { DATA_PRICE, DATA_EPS, DATA_PE_PB };
    } catch (e) {
      throw e;
    }
  }

  async _getPage(pageType, id) {
    await this._delay(); // Delay a bit to avoid a batch of requests found on the server side

    let path = '';
    switch (pageType) {
      case 'DATA_PRICE':
        path = ['/', 'i', 'n', 'v', 'e', 's', 't', 'r', 'u', 'e', '/', '{id}', '/', 'd', 'a', 'i', 'l', 'y', '-', 'c', 'a', 'n', 'd', 'l', 'e', 's', 't', 'i', 'c', 'k'];
        break;

      case 'DATA_EPS':
        path = ['/', 's', 't', 'o', 'c', 'k', '/', '{id}', '/', 'f', 'i', 'n', 'a', 'n', 'c', 'i', 'a', 'l', '-', 's', 't', 'a', 't', 'e', 'm', 'e', 'n', 't', 's', '/', 'e', 'p', 's', '-', 'd', 'a', 't', 'a'];
        break;

      case 'DATA_PE_PB':
        path = ['/', 's', 't', 'o', 'c', 'k', '/', '{id}', '/', 'e', 'n', 't', 'e', 'r', 'p', 'r', 'i', 's', 'e', '-', 'v', 'a', 'l', 'u', 'e', '/', 'a', 'l', 'l'];
        break;
    }
    try {
      const resp = await fetch(this.baseURL + path.join('').replace('{id}', id));
      return resp.text();
    } catch (e) {
      throw e;
    }
  }

  _delay() {
    const ms = Math.floor(Math.random() * 100);
    return new Promise(resolve => setTimeout(resolve, Math.max(ms, 50)));
  }
}

class GooServer {
  constructor() {
    this.baseURL = DOMAINS.gi;
  }

  async get(id) {
    try {
      const path = ['/', 'S', 't', 'o', 'c', 'k', 'I', 'n', 'f', 'o', '/', 'S', 't', 'o', 'c', 'k', 'D', 'i', 'v', 'i', 'd', 'e', 'n', 'd', 'P', 'o', 'l', 'i', 'c', 'y', '.', 'a', 's', 'p', '?', 'S', 'T', 'O', 'C', 'K', '_', 'I', 'D', '=', '{id}'];
      const resp = await fetch(this.baseURL + path.join('').replace('{id}', id));
      return { dividendPolicyPage: await resp.text() };
    } catch (e) {
      throw e;
    }
  }
}

chrome.runtime.onMessage.addListener((msg, sender, sendResp) => {
  const { cmd, params } = msg;
  switch (cmd) {
    case 'CMD_STOCK_DATA':
      const gw = new GwServer();
      const goo = new GooServer();
      Promise.all([ gw.get(params.id), goo.get(params.id) ])
        .then(([ gwStockData, gooStockData ]) => sendResp({ result: { gwStockData, gooStockData } }))
        .catch(e => sendResp({ error: e.toString() }));
      break;
  }
  return true;
});
