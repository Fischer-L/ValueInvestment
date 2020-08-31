let yaUsHash = '';
import('./getYaUsHash').then(resp => yaUsHash = resp.default());

const middleName = {
  of(key) {
    return this[key].filter((v, i) => i % 2 === 0).join('');
  },
  ya: [ 'y', '6', 'a', 'd', 'h', 'b', 'o', 'f', 'o' ],
  gi: [ 'g', 'z', 'o', '5', 'o', '1', 'd', 'p', 'i', 'u', 'n', '9', 'f', 'j', 'o' ],
  gw: [ 'w', '5', 'a', 'q', 'n', 'n', 't', 'a', 'g', 'o', 'o', 'p', 'o' ],
  cmy: [ 'c', 'a', 'm', 'p', 'o', 'q', 'n', '3', 'e', '1', 'y'],
  hi: [ 'h', 'n', 'i', 'p', 's', 'r', 't', 'z', 'o', 'a', 'c', 'q', 'k' ],
  nt: [ 'n', 'b' ,'o', 'd', 'r', 'l', 'w', 'r', 'a', 'a', 'y', '5', '.', '8', 't', 'y', 'w', '0', 's', 'e', 't', 'g', 'h', '1', 'r' ],
};

export default function getURL(site, query, pathParams) {
  switch (site) {
    case 'gw':
      return `https://www.${middleName.of('gw')}.com/stock/astock/techchart?stockno=${encodeURIComponent(query.stockId)}`;

    case 'cmy':
      return `https://www.${middleName.of('cmy')}.tw/follow/channel/stock-${pathParams.stockId}`;

    case 'ptt':
      return `https://www.google.com/search?tbs=qdr:w&q=${encodeURIComponent(query.q)}+site:www.ptt.cc/bbs/Stock`;

    case 'pttuser':
      return `https://www.ptt.cc/bbs/Stock/search?q=author%3A${encodeURIComponent(query.q)}`;

    case 'pttpost':
      return `https://www.ptt.cc/bbs/Stock/search?q=${encodeURIComponent(query.q)}`;

    case 'chips':
      return `https://${middleName.of('gi')}.tw/StockInfo/ShowBuySaleChart.asp?CHT_CAT=DATE&STOCK_ID=${encodeURIComponent(query.stockId)}`;

    case 'news':
      return `https://www.google.com/search?tbm=nws&q=${encodeURIComponent(query.q)}`;

    case '24hrs_news':
      return `https://www.google.com/search?tbm=nws&tbs=qdr:d&q=${encodeURIComponent(query.q)}`;

    case 'ya_us':
      return `https://finance.${middleName.of('ya')}.com/quote/${pathParams.stockId}/chart?p=${encodeURIComponent(query.stockId)}#${yaUsHash}`;

    case 'hi_buyer':
      return `https://${middleName.of('hi')}.tw/stock/main.aspx?no=${encodeURIComponent(query.stockId)}`;

    case 'big_holder':
      return `https://${middleName.of('nt')}.info/StockHolders.aspx?stock=${encodeURIComponent(query.stockId)}`;
  }
  return '';
}
