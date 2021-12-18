import localVarsOf from './utils/localVarsOf';
import messageBackground from './utils/messageBackground';

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
    return true;
  },
  exec() {
    let cmd = null;
    let [ instruction, stockId ] = window.prompt('Enter id').split(' ');
    switch (instruction) {
      case 'h':
        cmd = 'CM_STOCK_HOLDERS';
        break;

      default:
        stockId = instruction;
        cmd = 'CMD_STOCK_TECHNICAL';
        break;
    }
    if (cmd && stockId) {
      messageBackground({
        cmd,
        params: { stockId },
      });
    }
  },
});

window.addEventListener('load', async function () {
  hotKeysManager.init();
});
