const defaultOptions = {
  maxAge: 20 * 60 * 1000, // 20 mins
};

class CacheProvider {
  constructor(options = {}) {
    this._cache = {};
    this._options = {
      ...defaultOptions,
      ...options,
    };
    this._maxAge = this._options.maxAge;
  }

  get(key) {
    this._removeCacheIfExpired(key);
    const cache = this._cache[key];
    return cache ? cache.data : null;
  }

  set(key, data) {
    this._cache[key] = {
      data,
      updateTime: Date.now(),
    };
    this._scheduleCacheCleanUp();
  }

  remove(key) {
    delete this._cache[key];
  }

  _scheduleCacheCleanUp() {
    if (this._cleanUpTimer || this._maxAge < 0) {
      return;
    }
    this._cleanUpTimer = setTimeout(() => {
      const keys = Object.keys(this._cache);
      if (!keys.length) return;
      keys.forEach(key => this._removeCacheIfExpired(key));
      this._cleanUpTimer = null;
      this._scheduleCacheCleanUp();
    }, this._maxAge + 1);
  }

  _removeCacheIfExpired(key) {
    const cache = this._cache[key];
    if (!cache || this._maxAge < 0) return;
    if (Date.now() - cache.updateTime >= this._maxAge) delete this._cache[key];
  }
}

module.exports = CacheProvider;
