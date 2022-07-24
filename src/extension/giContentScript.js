import giURL, { PATH_TYPE } from './utils/giURL';
import localVarsOf from './utils/localVarsOf';

const stockListTable = {
  _localVars: null,

  _dataElemId: [ 'tx', 'tStoc', 'kList', 'Data' ].join(''),

  _autoEnlarge() {
    const localVars = this._localVars;
    if (localVars._autoEnlargeObserver) {
      return;
    }
    if (!localVars._autoEnlargeTrialCounts) {
      localVars._autoEnlargeTrialCounts = 0;
    }

    const root = document.querySelector(`#${this._dataElemId}`);
    if (!root && localVars._autoEnlargeTrialCounts < 10) {
      setTimeout(() => this._autoEnlarge(), 330);
      localVars._autoEnlargeTrialCounts++;
      return;
    }
    localVars._autoEnlargeTrialCounts = 0;

    if (root) {
      root.querySelector('div').style.width = 'auto';
      localVars._autoEnlargeObserver = new MutationObserver(() => {
        root.querySelector('div').style.width = 'auto';
      });
      localVars._autoEnlargeObserver.observe(root, { childList: true, subtree: true });
    }
  },

  _rmAds() {
    const localVars = this._localVars;
    if (localVars._rmAdsObserver) {
      return;
    }

    localVars._rmAdsObserver = new MutationObserver(() => {
      Array.from(document.querySelectorAll('.adsbygoogle')).forEach(elem => elem.remove());
    });
    localVars._rmAdsObserver.observe(document.body, { childList: true, subtree: true });
  },

  isTargetPage() {
    return window.location.href.startsWith(giURL(PATH_TYPE.LIST));
  },

  init() {
    this._localVars = localVarsOf('stockListTableLocalVars', {});
    if (this._localVars.init) {
      return;
    }
    if (this.isTargetPage()) {
      this._localVars.init = true;
      this._autoEnlarge();
      this._rmAds();
    }
  },
};

window.addEventListener('load', async function () {
  stockListTable.init();
});
