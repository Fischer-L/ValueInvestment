import localVarsOf from './utils/localVarsOf';
import runJobs from './utils/runJobs';

const rmPopupJob = {
  id: 'rmPopupJob',

  _rmPopup() {
    const localVars = this._localVars;

    localVars.observer = new MutationObserver(() => {

      Object.keys(localVars.removalTarget).forEach(className => {
        const elem = document.querySelector(className);
        if (elem) {
          elem.remove();
          localVars.removalTarget[className] = true;
        }
      });

      if (Object.values(localVars.removalTarget).every(Boolean)) {
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
      this._rmPopup();
    }
  },
};
