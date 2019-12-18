import CacheProvider from '../cacheProvider';

function fakeRequest() {
  return {
    path: '/fakeRequest',
  };
}

function after(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe('CacheProvider', () => {
  it('should expire cache after the max age', async () => {
    const maxAge = 50;
    const req = fakeRequest();
    const cache = new CacheProvider({ maxAge });

    cache.set(req, 1);
    expect(cache.get(req)).toBe(1);

    await after(maxAge + 2);
    expect(cache.get(req)).toBeNull();
  });

  it('should invalidate cache', async () => {
    const maxAge = 9999;
    const req = fakeRequest();
    const cache = new CacheProvider({ maxAge, shouldInvalidateCache: () => true });
    cache.set(req, 1);
    expect(cache.get(req)).toBeNull();
  });

  it('should remove cache', async () => {
    const req = fakeRequest();
    const cache = new CacheProvider();
    cache.set(req, 1);
    expect(cache.get(req)).toBe(1);
    cache.remove(req);
    expect(cache.get(req)).toBeNull();
  });
});
