class CacheProvider {
  constructor({ maxAge, shouldInvalidateCache }) {
    this._cache = {};
    this._maxAge = maxAge;
    this._shouldInvalidateCache = shouldInvalidateCache;
  }

  get(req) {
    const key = req.path;
    this._removeCacheIfExpired(key);

    let cache = this._cache[key];
    if (cache && this._shouldInvalidateCache && this._shouldInvalidateCache(req)) {
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

  _scheduleCacheCleanUp() {
    if (this._cleanUpTimer) return;
    this._cleanUpTimer = setTimeout(() => {
      Object.keys(this._cache).forEach(key => this._removeCacheIfExpired(key));
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
