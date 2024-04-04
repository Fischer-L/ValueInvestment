import DOMAINS from '~/utils/domains';

export default async function getStockProfile(stockId) {
  const trailPath = [ 'FC', 'NT0', '00017', '?sym', 'bol_id=', stockId ].join('');
  const url = [ DOMAINS.fg, 'api', 'v2', 'data', 'contents', trailPath ].join('/');
  const response = await fetch(url);
  const json = await response.json();
  return {
    id: stockId,
    name: json.data.content.rawContent.name,
  };
}
