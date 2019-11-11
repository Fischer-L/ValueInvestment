const bookmarkProvider = {
  put(id, payload) {
    id = String(id);
    if (localStorage.getItem(id)) return;
    localStorage.setItem(id, JSON.stringify(payload));
  },

  remove(id) {
    localStorage.removeItem(String(id));
  },

  toArray() {
    const bookmarks = [];
    for (let i = 0; i < localStorage.length; ++i) {
      try {
        const item = JSON.parse(localStorage.getItem(localStorage.key(i)));
        if (this._isBookmarkType(item)) {
          bookmarks.push(item);
        }
      } catch (e) {} // eslint-disable-line no-empty
    }
    return Promise.resolve(bookmarks);
  },

  _isBookmarkType(payload) {
    return Object.prototype.toString.call(payload) === '[object Object]' && payload.id && payload.name;
  },
};

export default bookmarkProvider;
