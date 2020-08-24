import GwClient from './GwClient';
import GooClient from './GooClient';
import { StockProviderClient } from './StockProviderClient';

let provider = null;

export default function getStockProvider(params) {
  if (!provider) {
    provider = new StockProviderClient({
      ...params,
      dataParsers: {
        gwStockData: new GwClient(params),
        gooStockData: new GooClient(params),
      },
    });
  }
  return provider;
}
