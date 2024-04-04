import DOMAINS from '~/utils/domains';
import getURL, { SITE } from '~/utils/getURL';

const getStockId = () => window.location.pathname.split('/')[2];

const isTargetPage = () => {
  const { href, pathname } = window.location;
  return href.startsWith(DOMAINS.gw + '/') && !pathname.includes('login');
};

const gwHotkeys = [
  {
    targetKeys: [ 'e' ],

    isTargetPage,

    exec() {
      const url = getURL(SITE.eps, null, { stockId: getStockId() });
      window.location.assign(url);
    },
  },
  {
    targetKeys: [ 'r' ],

    isTargetPage,

    exec() {
      const url = getURL(SITE.epsRiver, null, { stockId: getStockId() });
      window.location.assign(url);
    },
  },
  {
    targetKeys: [ 'p' ],

    isTargetPage,

    exec() {
      const url = getURL(SITE.profit, null, { stockId: getStockId() });
      window.location.assign(url);
    },
  },
  {
    targetKeys: [ 'f' ],

    isTargetPage,

    exec() {
      const url = getURL(SITE.tw_finance, null, { stockId: getStockId() });
      window.location.assign(url);
    },
  },
  {
    targetKeys: [ 't' ],

    isTargetPage,

    exec() {
      const url = getURL(SITE.technical, null, { stockId: getStockId() });
      window.location.assign(url);
    },
  },
  {
    targetKeys: [ 'm' ],

    isTargetPage,

    exec() {
      const url = [ DOMAINS.gw, '/', 'stock', '/', getStockId(), '/', 'margin-', 'trading/', 'synopsis' ].join('');
      window.location.assign(url);
    },
  },
  {
    targetKeys: [ 'i' ],

    isTargetPage,

    exec() {
      const url = [ DOMAINS.gw, '/', 'stock', '/', getStockId(), '/', 'institutional', '-investors', '/trend' ].join('');
      window.location.assign(url);
    },
  },
];

export default gwHotkeys;
