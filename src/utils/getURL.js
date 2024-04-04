import DOMAINS from './domains';

export const SITE = {
  eps: 'eps',
  epsRiver: 'epsRiver',
  profit: 'profit',
  technical: 'technical',
  forum: 'forum',
  ptt: 'ptt',
  pttuser: 'pttuser',
  pttpost: 'pttpost',
  chips: 'chips',
  info: 'info',
  news_24hrs: 'news_24hrs',
  us_finance: 'us_finance',
  tw_finance: 'tw_finance',
  margin: 'margin',
  big_holder: 'big_holder',
  detail_holders: 'detail_holders',
  what_is: 'what_is',
};

export default function getURL(site, query, params) {
  switch (site) {
    case SITE.epsRiver:
      return [ DOMAINS.gw, '/', 'stock', '/', params.stockId, '/', 'enterprise', '-', 'value', '/', 'price', '-', 'to', '-', 'earning', '-', 'river' ].join('');

    case SITE.eps:
      return [ DOMAINS.gw, '/', 'stock', '/', params.stockId, '/', 'financial', '-', 'statements', '/', 'eps' ].join('');

    case SITE.profit:
      return [ DOMAINS.gw, '/', 'stock', '/', params.stockId, '/', 'profitability', '/', 'profit', '-margin' ].join('');

    case SITE.technical: case 'gw':
      if (site === 'gw') {
        console.warn('Deprecated: getURL of gw');
      }
      return `${DOMAINS.gw}/stock/${params.stockId}/technical-chart`;

    case SITE.forum:
      return `${DOMAINS.cmy}/forum/stock/${params.stockId}`;

    case SITE.ptt:
      return `https://www.google.com/search?tbs=qdr:w&q=${encodeURIComponent(query.q)}+site:www.ptt.cc/bbs/Stock`;

    case SITE.pttuser:
      return `https://www.ptt.cc/bbs/Stock/search?q=author%3A${encodeURIComponent(query.q)}`;

    case SITE.pttpost:
      return `https://www.ptt.cc/bbs/Stock/search?q=${encodeURIComponent(query.q)}`;

    case SITE.chips:
      return [ DOMAINS.gi, '/t', 'w/Show', 'BuySal', 'eChart.a', 'sp?CHT_', 'CAT=DAT', 'E&STO', 'CK_ID=', encodeURIComponent(query.stockId) ].join('');

    case SITE.info:
      return `${DOMAINS.fg}/ai/${params.stockId}`;

    case SITE.news_24hrs:
      return `https://www.google.com/search?tbm=nws&tbs=qdr:d&q=${encodeURIComponent(query.q)}`;

    case SITE.us_finance:
      return `${DOMAINS.yFinance}/quote/${params.stockId}/financials?p=${encodeURIComponent(query.stockId)}`;

    case SITE.tw_finance:
      const path = 'financial' + '-' + 'statements' + '/' + 'monthly' + '-' + 'revenue';
      return `${DOMAINS.gw}/stock/${params.stockId}/${path}`;

    case SITE.margin:
      return `${DOMAINS.hi}/stock/chips.aspx?no=${encodeURIComponent(query.stockId)}&m=mg`;

    case SITE.big_holder:
      return `${DOMAINS.nt}/StockHolders.aspx?stock=${encodeURIComponent(query.stockId)}`;

    case SITE.detail_holders:
      return [ DOMAINS.gi, '/t', 'w/Equit', 'yDistri', 'butionCl', 'assHis.asp?', 'STOCK', '_ID=', encodeURIComponent(query.stockId) ].join('');

    case SITE.what_is:
      return 'https://www.google.com/search?q=' + encodeURIComponent(query.name + '做什麼');
  }
  return '';
}
