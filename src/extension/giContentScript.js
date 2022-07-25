import giURL, { PATH_TYPE } from './utils/giURL';
import localVarsOf from './utils/localVarsOf';

const autoEnlargeOperation = {
  _localVars: null,

  _rootElemId: [ 'tx', 'tStoc', 'kList', 'Data' ].join(''),

  _autoEnlarge() {
    const localVars = this._localVars;
    if (localVars.observer) {
      return;
    }

    const root = document.querySelector(`#${this._rootElemId}`);
    if (!root && localVars.trialCounts < 10) {
      setTimeout(() => this._autoEnlarge(), 330);
      localVars.trialCounts++;
      return;
    }
    localVars.trialCounts = 0;

    if (root) {
      root.querySelector('div').style.width = 'auto';
      localVars.observer = new MutationObserver(() => {
        root.querySelector('div').style.width = 'auto';
      });
      localVars.observer.observe(root, { childList: true, subtree: true });
    }
  },

  isTargetPage() {
    return window.location.href.startsWith(giURL(PATH_TYPE.LIST));
  },

  init() {
    this._localVars = localVarsOf('gi-autoEnlargeOperation', {
      observer: null,
      trialCounts: 0,
    });
    if (this._localVars.init) {
      return;
    }
    if (this.isTargetPage()) {
      this._localVars.init = true;
      this._autoEnlarge();
    }
  },
};

const rmAdsOperation = {

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
    return true;
  },

  init() {
    this._localVars = localVarsOf('gi-rmAdsOperation', {
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

window.addEventListener('load', async function () {
  rmAdsOperation.init();
  autoEnlargeOperation.init();
});
