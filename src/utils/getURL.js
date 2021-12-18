import DOMAINS from './domains';

export default function getURL(site, query, pathParams, hash) {
  switch (site) {
    case 'pe':
      return [ DOMAINS.gw, '/', 'stock', '/', pathParams.stockId, '/', 'enterprise', '-', 'value', '/', 'price', '-', 'to', '-', 'earning', '-', 'ratio' ].join('');

    case 'eps':
      return [ DOMAINS.gw, '/', 'stock', '/', pathParams.stockId, '/', 'financial', '-', 'statements', '/', 'eps' ].join('');

    case 'technical': case 'gw':
      if (site === 'gw') {
        console.warn('Deprecated: getURL of gw');
      }
      return `${DOMAINS.gw}/stock/${pathParams.stockId}/technical-chart`;

    case 'cmy':
      return `${DOMAINS.cmy}/follow/channel/stock-${pathParams.stockId}`;

    case 'ptt':
      return `https://www.google.com/search?tbs=qdr:w&q=${encodeURIComponent(query.q)}+site:www.ptt.cc/bbs/Stock`;

    case 'pttuser':
      return `https://www.ptt.cc/bbs/Stock/search?q=author%3A${encodeURIComponent(query.q)}`;

    case 'pttpost':
      return `https://www.ptt.cc/bbs/Stock/search?q=${encodeURIComponent(query.q)}`;

    case 'chips':
      return [ DOMAINS.gi, '/t', 'w/Show', 'BuySal', 'eChart.a', 'sp?CHT_', 'CAT=DAT', 'E&STO', 'CK_ID=', encodeURIComponent(query.stockId) ].join('');

    case 'news':
      return `https://www.google.com/search?tbm=nws&q=${encodeURIComponent(query.q)}`;

    case '24hrs_news':
      return `https://www.google.com/search?tbm=nws&tbs=qdr:d&q=${encodeURIComponent(query.q)}`;

    case 'ya_us':
      return `${DOMAINS.yFinance}/quote/${pathParams.stockId}/chart?p=${encodeURIComponent(query.stockId)}#${hash}`;

    case 'hi_margin':
      return `${DOMAINS.hi}/stock/chips.aspx?no=${encodeURIComponent(query.stockId)}&m=mg`;

    case 'big_holder':
      return `${DOMAINS.nt}/StockHolders.aspx?stock=${encodeURIComponent(query.stockId)}`;
  }
  return '';
}
