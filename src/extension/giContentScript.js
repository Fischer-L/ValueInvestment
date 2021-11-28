import giURL, { PATH_TYPE } from './utils/giURL';

const stockListTable = {
  id: [ 'tx', 'tStoc', 'kList', 'Data' ].join(''),

  autoEnlarge() {
    let localVars = window.giContentScript.stockListTableLocalVars || {
      trialCounts: 0,
      observer: null,
    };
    window.giContentScript.stockListTableLocalVars = localVars;

    if (localVars.observer) {
      return;
    }

    const root = document.querySelector(`#${this.id}`);
    if (!root && localVars.trialCounts < 10) {
      setTimeout(() => this.autoEnlarge(), 330);
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
};

window.addEventListener('load', async function () {
  if (!window.giContentScript) {
    window.giContentScript = {};
  }

  if (stockListTable.isTargetPage()) {
    stockListTable.autoEnlarge();
  }
});
