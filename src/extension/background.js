class GwServer {
  constructor() {
    const h = [ 'w', 'a', 'a', 'b', 'n', 'c', 't', 'd', 'g', 'e', 'o', 'f', 'o' ].filter((l, i) => i % 2 === 0).join('');
    this.baseURL = `https://www.${h}.com`;
  }

  async get(id) {
    try {
      const [ epsPage, DATA_PE_PB_DIVIDEND ] = await Promise.all([
        null && this._getPage('eps', id), // TODO: Upgrade EPS data
        this._getPage('DATA_PE_PB_DIVIDEND', id),
      ]);
      return { epsPage, DATA_PE_PB_DIVIDEND };
    } catch (e) {
      throw e;
    }
  }

  async _getPage(pageType, id) {
    await this._delay(); // Delay a bit to avoid a batch of requests found on the server side

    let path = '';
    switch (pageType) {
      case 'eps':
        path = `/stock/report/basic_eps?stockno=${id}`;
        break;

      case 'DATA_PE_PB_DIVIDEND':
        path = `/stock/${id}/enterprise-value/data`;
        break;
    }
    try {
      const resp = await fetch(this.baseURL + path);
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
    const h = [ 'a', 'g', 'r', 'o', '6', 'o', 'q', 'd', 'i', 'i', 'b', 'n', 'z', 'f', 'l', 'o' ].filter((l, i) => i % 2 === 1).join('');
    this.baseURL = `https://${h}.tw`;
  }

  async get(id) {
    try {
      const resp = await fetch(this.baseURL + `/StockInfo/StockDividendPolicy.asp?STOCK_ID=${id}`);
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
