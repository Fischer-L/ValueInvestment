import axios from 'axios';
import DOMAINS from '~/utils/domains';

export default async function getStockProfile(stockId) {
  const trailPath = [ 'FC', 'NT0', '00017', '?sym', 'bol_id=', stockId ].join('');
  const url = [ DOMAINS.fg, 'api', 'v2', 'data', 'contents', trailPath ].join('/');
  const result = await axios.get(url);
  return {
    id: stockId,
    name: result.data.data.content.rawContent.name,
  };
}
