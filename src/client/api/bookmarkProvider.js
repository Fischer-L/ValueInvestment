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

const bookmarkProvider = {

  _bookmarks: null,

  async _init() {
    if (this._bookmarks) {
      return;
    }
    try {
      const { data } = await apiClient.get('/bookmarks');
      this._bookmarks = data.reduce((bookmarks, item) => {
        bookmarks[item.id] = item;
        return bookmarks;
      }, {});
    } catch (e) {
      console.error(e);
    }
  },

  async toArray() {
    await this._init();
    return Object.values(this._bookmarks);
  },

  async put(id, payload) {
    await this._init();
    if (!this._bookmarks[id]) {
      try {
        apiClient.post('/bookmarks', { payload: [ payload ] });
      } catch (e) {
        console.error(e);
      }
      this._bookmarks[id] = payload;
    }
  },

  async remove(id) {
    await this._init();
    if (this._bookmarks[id]) {
      try {
        apiClient.delete('/bookmarks', { params: { ids: id } });
      } catch (e) {
        console.error(e);
      }
      delete this._bookmarks[id];
    }
  },
};

export default bookmarkProvider;
