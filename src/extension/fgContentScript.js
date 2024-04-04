import localVarsOf from './utils/localVarsOf';
import runJobs from './utils/runJobs';

const rmPopupJob = {
  id: 'rmPopupJob',

  _rmPopups(localVars) {
    Object.keys(localVars.removalTarget).forEach(className => {
      const elem = document.querySelector(className);
      if (elem) {
        elem.remove();
        localVars.removalTarget[className] = true;
      }
    });
  },

  _allClear(localVars) {
    return Object.values(localVars.removalTarget).every(Boolean);
  },

  _exec() {
    const localVars = this._localVars;
    this._rmPopups(localVars);
    if (this._allClear(localVars)) {
      return;
    }

    localVars.observer = new MutationObserver(() => {
      this._rmPopups(localVars);
      if (this._allClear(localVars)) {
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
    this._localVars = localVarsOf(this.id, {
      observer: null,
      removalTarget: {
        ['.guest-limit-popup__wrapper']: false,
        ['.header__open-account-dialog']: false,
      },
    });
    if (this._localVars.init) {
      return;
    }
    if (this.isTargetPage()) {
      this._localVars.init = true;
      this._exec();
    }
  },
};

runJobs(rmPopupJob);
