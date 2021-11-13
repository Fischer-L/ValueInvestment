import DOMAINS from '~/utils/domains';

let yaUsHash = '';
import('./getYaUsHash').then(resp => yaUsHash = resp.default());

export default function getURL(site, query, pathParams) {
  switch (site) {
    case 'gw':
      return `${DOMAINS.gw}/stock/${encodeURIComponent(query.stockId)}/technical-chart`;

    case 'cmy':
      return `${DOMAINS.cmy}/follow/channel/stock-${pathParams.stockId}`;

    case 'ptt':
      return `https://www.google.com/search?tbs=qdr:w&q=${encodeURIComponent(query.q)}+site:www.ptt.cc/bbs/Stock`;

    case 'pttuser':
      return `https://www.ptt.cc/bbs/Stock/search?q=author%3A${encodeURIComponent(query.q)}`;

    case 'pttpost':
      return `https://www.ptt.cc/bbs/Stock/search?q=${encodeURIComponent(query.q)}`;

    case 'chips':
      return `${DOMAINS.gi}/StockInfo/ShowBuySaleChart.asp?CHT_CAT=DATE&STOCK_ID=${encodeURIComponent(query.stockId)}`;

    case 'news':
      return `https://www.google.com/search?tbm=nws&q=${encodeURIComponent(query.q)}`;

    case '24hrs_news':
      return `https://www.google.com/search?tbm=nws&tbs=qdr:d&q=${encodeURIComponent(query.q)}`;

    case 'ya_us':
      return `${DOMAINS.yFinance}/quote/${pathParams.stockId}/chart?p=${encodeURIComponent(query.stockId)}#${yaUsHash}`;

    case 'hi_margin':
      return `${DOMAINS.hi}/stock/chips.aspx?no=${encodeURIComponent(query.stockId)}&m=mg`;

    case 'big_holder':
      return `${DOMAINS.nt}/StockHolders.aspx?stock=${encodeURIComponent(query.stockId)}`;
  }
  return '';
}
