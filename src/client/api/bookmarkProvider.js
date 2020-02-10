import { apiClient } from '@/api/index';
import MARKET_TYPE from '@/utils/marketType';

export const BOOKMARK_TYPE = {
  STOCK: 'stock',
  PTT_USER: 'pttuser',
};

const bookmarkProvider = {

  _bookmarks: null,

  _init() {
    if (this._initPromise) return this._initPromise;

    this._initPromise = apiClient.get('/bookmarks')
      .then(({ data: { stocks, pttUsers } }) => {
        this._bookmarks = {};
        this._bookmarks[BOOKMARK_TYPE.STOCK] = stocks.reduce((acc, item) => {
          acc[item.id] = item;
          return acc;
        }, {});
        this._bookmarks[BOOKMARK_TYPE.PTT_USER] = pttUsers.reduce((users, item) => {
          users[item.id] = item;
          return users;
        }, {});
      })
      .catch(e => {
        this._initPromise = null;
        console.error(e);
      });
    return this._initPromise;
  },

  async toArray(type) {
    await this._init();
    return Object.values(this._bookmarks[type]).map(item => ({
      ...item,
      // For the legacy reason, the TW market is stored without a market type,
      // so add the type locally.
      market: !item.market ? MARKET_TYPE.TW : item.market,
    }));
  },

  async put(type, id, payload) {
    await this._init();
    const data = this._bookmarks[type];
    if (!data[id] && payload) {
      payload = {
        ...payload,
        id: payload.id.toUpperCase(),
      };
      try {
        apiClient.post(`/bookmarks/${type}`, { payloads: [ payload ] });
      } catch (e) {
        console.error(e);
      }
      data[id] = payload;
    }
  },

  async remove(type, id) {
    await this._init();
    const data = this._bookmarks[type];
    if (data[id]) {
      try {
        apiClient.delete(`/bookmarks/${type}`, { params: { ids: id } });
      } catch (e) {
        console.error(e);
      }
      delete data[id];
    }
  },
};

export default bookmarkProvider;
