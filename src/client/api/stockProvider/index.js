import GwClient from './GwClient';
import GooClient from './GooClient';
import { StockProviderClient } from './StockProviderClient';

let provider = null;

export default function getStockProvider(params) {
  if (!provider) {
    provider = new StockProviderClient({
      ...params,
      dataParsers: [
        [ 'gooStockData', new GooClient(params) ],
        [ 'gwStockData', new GwClient(params) ],
      ],
    });
  }
  return provider;
}
