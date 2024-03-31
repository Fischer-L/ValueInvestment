import runJobs from './utils/runJobs';
import localVarsOf from './utils/localVarsOf';

const rmBottomBannerJob = {
  id: 'gw-rmBottomBannerJob',

  _rmAds() {
    const localVars = this._localVars;
    if (localVars.observer) {
      return;
    }

    localVars.observer = new MutationObserver(() => {
      const ad = document.querySelector('.technical-shortcut-wrap');
      if (ad) {
        ad.remove();
        localVars.observer.disconnect();
        localVars.observer = null;
      }
    });
    localVars.observer.observe(document.body, { childList: true, subtree: true });
  },

  isTargetPage() {
    return true;
  },

  init() {
    this._localVars = localVarsOf('gw-rmBottomBannerJob', {
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

runJobs(rmBottomBannerJob);
