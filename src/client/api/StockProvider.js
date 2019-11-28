import WantgooClient from '~/lib/stockProvider/WantgooClient';

let provider = null;

export default function getStockProvider(params) {
  if (!provider) {
    provider = new WantgooClient(params);
  }
  return provider;
}
