import { apiClient } from '@/api/index';
import MARKET_TYPE from '@/utils/marketType';

export const BOOKMARK_TYPE = {
  STOCKS: 'stocks',
  STORIES: 'stories',
  PTT_USERS: 'pttUsers',
};

const bookmarkProvider = {
  _bookmarks: {},
  _bookmarkUpdateMarks: {},

  _normalizeId(type, id) {
    if (!id) {
      return null;
    }
    if (type === BOOKMARK_TYPE.STOCKS) {
      return id.toUpperCase();
    }
    return id;
  },

  _init() {
    if (this._initPromise) return this._initPromise;

    this._initPromise = apiClient.get('/bookmarks')
      .then(({ data }) => {
        Object.values(BOOKMARK_TYPE).forEach(type => {
          this._bookmarks[type] = data[type].reduce((acc, item) => {
            acc[item.id] = item;
            return acc;
          }, {});
          this._bookmarkUpdateMarks[type] = Date.now();
        });
      })
      .catch(e => {
        this._initPromise = null;
        console.error(e);
      });
    return this._initPromise;
  },

  async getUpdateMark(type) {
    await this._init();
    return this._bookmarkUpdateMarks[type];
  },

  async toArray(type) {
    await this._init();
    return Object.values(this._bookmarks[type]).map(item => {
      if (type !== BOOKMARK_TYPE.STOCKS) {
        return item;
      }
      return {
        ...item,
        // For the legacy reason, the TW market is stored without a market type,
        // so add the type locally.
        market: !item.market ? MARKET_TYPE.TW : item.market,
      };
    });
  },

  async put(type, id, payload) {
    await this._init();

    id = this._normalizeId(type, id);

    const data = this._bookmarks[type];

    if (!data[id] && payload) {
      if (type === BOOKMARK_TYPE.STOCKS) {
        payload = {
          ...payload,
          id,
        };
      }
      try {
        apiClient.post(`/bookmarks/${type}`, { payloads: [ payload ] });
      } catch (e) {
        console.error(e);
      }
      data[id] = payload;
      this._bookmarkUpdateMarks[type] = Date.now();
    }
  },

  async remove(type, id) {
    await this._init();

    id = this._normalizeId(type, id);
    const data = this._bookmarks[type];
    if (data[id]) {
      try {
        apiClient.delete(`/bookmarks/${type}`, { params: { ids: id } });
      } catch (e) {
        console.error(e);
      }
      delete data[id];
      this._bookmarkUpdateMarks[type] = Date.now();
    }
  },
};

export default bookmarkProvider;
