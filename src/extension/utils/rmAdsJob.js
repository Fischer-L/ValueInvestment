import DOMAINS from '~/utils/domains';
import localVarsOf from './localVarsOf';

function normalizeOrigin(origin) {
  return origin.endsWith('/') ? origin : origin + '/';
}

const rmAdsJob = {
  id: 'rmAdsJob',

  _rmAds() {
    const localVars = this._localVars;
    if (localVars.observer) {
      return;
    }

    localVars.observer = new MutationObserver(() => {
      const ads = Array.from(document.querySelectorAll('.adsbygoogle'));
      if (!ads.length) {
        return;
      }

      localVars.observer.disconnect();
      localVars.observer = null;

      ads.forEach(ad => ad.remove());
      // We don not know how many ad containers are out there so chose a magic number, 30.
      for (let i = 0; i < 30; i++) {
        const adContainer = document.querySelector(`#AD${i}`);
        if (adContainer) {
          adContainer.remove();
        }
      }
    });
    localVars.observer.observe(document.body, { childList: true, subtree: true });
  },

  isTargetPage() {
    const origin = normalizeOrigin(window.location.origin);
    return Object.values(DOMAINS).some(domain => normalizeOrigin(domain) === origin);
  },

  init() {
    this._localVars = localVarsOf(this.id, {
      observer: null,
    });
    if (this._localVars.init) {
      return;
    }
    if (this.isTargetPage()) {
      this._localVars.init = true;
      this._rmAds();
    }
  },
};

export default rmAdsJob;
