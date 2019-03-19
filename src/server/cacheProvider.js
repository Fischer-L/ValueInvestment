class CacheProvider {
  constructor({ maxAge, shouldForceUpdate }) {
    this._cache = {};
    this._maxAge = maxAge;
    this._shouldForceUpdate = shouldForceUpdate;
  }

  get(req) {
    const key = req.path;
    const cache = this._cache[key];
    let hasCache = !!cache;
    if (hasCache) hasCache = Date.now() - cache.updateTime <= this._maxAge;
    if (hasCache) hasCache = this._shouldForceUpdate ? !this._shouldForceUpdate(req) : hasCache;
    if (hasCache) return cache.data;
    return null;
  }

  set(req, data) {
    const key = req.path;
    this._cache[key] = {
      data,
      updateTime: Date.now(),
    };
  }
}

module.exports = CacheProvider;
