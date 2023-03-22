import CacheProvider from '../cacheProvider';

function after(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe('CacheProvider', () => {
  it('should expire cache after the max age', async () => {
    const key = 'key';
    const maxAge = 50;
    const cache = new CacheProvider({ maxAge });

    cache.set(key, 1);
    expect(cache.get(key)).toBe(1);

    await after(maxAge + 2);
    expect(cache.get(key)).toBeNull();
    cache.destroy();
  });

  it('should remove cache', async () => {
    const key = 'key';
    const cache = new CacheProvider();
    cache.set(key, 1);
    expect(cache.get(key)).toBe(1);
    cache.remove(key);
    expect(cache.get(key)).toBeNull();
    cache.destroy();
  });

  it('should not invalidate cache if maxAge < 0', async () => {
    const key = 'key';
    const cache = new CacheProvider({ maxAge: -1 });
    cache.set(key, 1);
    expect(cache.get(key)).toBe(1);
    await after(10);
    expect(cache.get(key)).toBe(1);
    cache.destroy();
  });
});
