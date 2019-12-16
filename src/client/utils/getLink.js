const middleName = {
  of(key) {
    return this[key].filter((v, i) => i % 2 === 0).join('');
  },
  gw: [ 'w', '5', 'a', 'q', 'n', 'n', 't', 'a', 'g', 'o', 'o', 'p', 'o' ],
  cmy: [ 'c', 'a', 'm', 'p', 'o', 'q', 'n', '3', 'e', '1', 'y'],
};

export default function getLink(site, query, pathParams) {
  switch (site) {
    case 'gw':
      return `https://www.${middleName.of('gw')}.com/stock/astock/techchart?stockno=${encodeURIComponent(query.stockId)}`;

    case 'cmy':
      return `https://www.${middleName.of('cmy')}.tw/follow/channel/stock-${pathParams.stockId}`;

    case 'ptt':
      return `https://www.google.com/search?tbs=qdr:m&q=${encodeURIComponent(query.q)}+site:www.ptt.cc/bbs/Stock`;

    case 'pttuser':
      return `https://www.ptt.cc/bbs/Stock/search?q=author%3A${encodeURIComponent(query.q)}`;

    case 'goodinfo':
      return `https://goodinfo.tw/StockInfo/ShowBuySaleChart.asp?CHT_CAT=DATE&STOCK_ID=${encodeURIComponent(query.stockId)}`;

    case 'news':
      return `https://www.google.com/search?tbm=nws&q=${encodeURIComponent(query.q)}`;

    case '24hrs_news':
      return `https://www.google.com/search?tbm=nws&tbs=qdr:d&q=${encodeURIComponent(query.q)}`;
  }
  return '';
}
