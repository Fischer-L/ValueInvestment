import { apiClient } from '@/api/index';

function clearLegacyLocalStorage() {
  function isBookmarkType(payload) {
    return Object.prototype.toString.call(payload) === '[object Object]' && payload.id && payload.name;
  }
  const legacyBookmarks = [];
  for (let i = 0; i < localStorage.length; ++i) {
    try {
      const item = JSON.parse(localStorage.getItem(localStorage.key(i)));
      if (isBookmarkType(item)) {
        legacyBookmarks.push(item);
      }
    } catch (e) {} // eslint-disable-line no-empty
  }
  legacyBookmarks.forEach(item => localStorage.removeItem(item.id));
  console.log('Done with clearLegacyLocalStorage');
}
clearLegacyLocalStorage();

export const BOOKMARK_TYPE = {
  STOCK: 'stock',
  PTT_USER: 'pttuser',
};

const bookmarkProvider = {

  _bookmarks: null,

  async _init() {
    if (this._bookmarks) {
      return;
    }
    try {
      const { data: { stocks, pttUsers } } = await apiClient.get('/bookmarks');

      this._bookmarks = {};

      this._bookmarks[BOOKMARK_TYPE.STOCK] = stocks.reduce((acc, item) => {
        acc[item.id] = item;
        return acc;
      }, {});

      this._bookmarks[BOOKMARK_TYPE.PTT_USER] = pttUsers.reduce((users, item) => {
        users[item.id] = item;
        return users;
      }, {});
    } catch (e) {
      console.error(e);
    }
  },

  async toArray(type) {
    await this._init();
    return Object.values(this._bookmarks[type]);
  },

  async put(type, id, payload) {
    await this._init();
    const data = this._bookmarks[type];
    if (!data[id]) {
      try {
        apiClient.post(`/bookmarks/${type}`, { payload: [ payload ] });
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
