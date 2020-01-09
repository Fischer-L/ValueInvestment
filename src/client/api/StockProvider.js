import GwClient from '~/lib/stockProvider/GwClient';
import { StockProviderClient } from '~/lib/stockProvider/StockProviderClient';

let provider = null;

export default function getStockProvider(params) {
  if (!provider) {
    provider = new StockProviderClient({
      ...params,
      dataParsers: [ new GwClient(params) ],
    });
  }
  return provider;
}
