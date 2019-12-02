import GwClient from '~/lib/stockProvider/GwClient';

let provider = null;

export default function getStockProvider(params) {
  if (!provider) {
    provider = new GwClient(params);
  }
  return provider;
}
