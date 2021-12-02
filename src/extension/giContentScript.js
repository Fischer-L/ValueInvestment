import giURL, { PATH_TYPE } from './utils/giURL';
import messageBackground from './utils/messageBackground';

function localVarsOf(key, defaultVars = {}) {
  if (!window.giContentScript) {
    window.giContentScript = {};
  }
  const localVars = window.giContentScript[key] || defaultVars;
  window.giContentScript[key] = localVars;
  return localVars;
}

const stockListTable = {
  _localVars: null,

  _id: [ 'tx', 'tStoc', 'kList', 'Data' ].join(''),

  _autoEnlarge() {
    const localVars = this._localVars;
    if (localVars.observer) {
      return;
    }

    const root = document.querySelector(`#${this._id}`);
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

  init() {
    this._localVars = localVarsOf('stockListTableLocalVars', {
      trialCounts: 0,
      observer: null,
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

const hotKeysManager = {
  _localVars: null,

  _activeKeys: {},

  hotKeys: [],

  _execHotKey() {
    for (let i = 0; i < this.hotKeys.length; i++) {
      const hotKey = this.hotKeys[i];
      if (hotKey.targetKeys.every(key => this._activeKeys[key])) {
        this._activeKeys = {};
        hotKey.exec();
        return;
      }
    }
  },

  init() {
    this._localVars = localVarsOf('hotKeysManagerLocalVars');
    if (this._localVars.init) {
      return;
    }

    if (this.hotKeys.some(hotKey => hotKey.isTargetPage())) {

      this._localVars.init = true;

      document.addEventListener('keydown', e => {
        const key = e.key.toLowerCase();
        this._activeKeys[key] = true;
        this._execHotKey();
      });
      document.addEventListener('keyup', e => {
        const key = e.key.toLowerCase();
        this._activeKeys[key] = false;
      });
    }
  },
};
hotKeysManager.hotKeys.push({
  targetKeys: [ 'meta', '\'', 'enter' ],
  isTargetPage() {
    return window.location.href.startsWith(giURL(PATH_TYPE.LIST));
  },
  exec() {
    const stockId = window.prompt('Enter id');
    if (stockId) {
      messageBackground({
        cmd: 'CMD_STOCK_TECHNICAL',
        params: { stockId },
      });
    }
  },
});

window.addEventListener('load', async function () {
  stockListTable.init();
  hotKeysManager.init();
});
