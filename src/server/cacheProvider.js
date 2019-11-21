const defaultOptions = {
  maxAge: 20 * 60 * 1000, // 20 mins
  shouldInvalidateCache: () => false,
};

class CacheProvider {
  constructor(options = {}) {
    this._cache = {};
    this._options = {
      ...defaultOptions,
      ...options,
    };
    this._maxAge = options.maxAge;
  }

  get(req) {
    const key = req.path;
    this._removeCacheIfExpired(key);

    let cache = this._cache[key];
    if (cache && this._options.shouldInvalidateCache(req)) {
      cache = null;
      delete this._cache[key];
    }
    return cache ? cache.data : null;
  }

  set(req, data) {
    const key = req.path;
    this._cache[key] = {
      data,
      updateTime: Date.now(),
    };
    this._scheduleCacheCleanUp();
  }

  remove(req) {
    const key = req.path;
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
    if (!cache) return;
    if (Date.now() - cache.updateTime >= this._maxAge) delete this._cache[key];
  }
}

module.exports = CacheProvider;
