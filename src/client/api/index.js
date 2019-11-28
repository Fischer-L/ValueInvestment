import axios from 'axios';
import loginManager from './loginManager';
import getStockProvider from './StockProvider';

const apiClient = axios.create({
  baseURL: window.location.origin,
  timeout: 10000,
});

export {
  apiClient,
  loginManager,
  getStockProvider,
};
