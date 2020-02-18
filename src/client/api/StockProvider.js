import GwClient from '~/lib/stockProvider/GwClient';
import GooClient from '~/lib/stockProvider/GooClient';
import { StockProviderClient } from '~/lib/stockProvider/StockProviderClient';

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
