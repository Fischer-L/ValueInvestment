import localVarsOf from './localVarsOf';
import gwHotkeys from './gwHotkeys';
import globalHotkeys from './globalHotkeys';

const hotKeysJob = {
  id: 'hotKeysJob',

  _localVars: null,

  _activeKeys: {},

  _hotKeys: [],

  _execHotKey() {
    for (let i = 0; i < this._hotKeys.length; i++) {
      const hotKey = this._hotKeys[i];
      if (hotKey.targetKeys.every(key => this._activeKeys[key])) {
        this._activeKeys = {};
        hotKey.exec();
        return;
      }
    }
  },

  addHotkeys(hotkeys) {
    hotkeys = hotkeys.filter(key => key.isTargetPage());
    this._hotKeys.push(...hotkeys);
  },

  isTargetPage() {
    return true;
  },

  init() {
    this._localVars = localVarsOf(this.id);
    if (this._localVars.init) {
      return;
    }

    if (this._hotKeys.length) {

      this._localVars.init = true;

      document.addEventListener('keydown', e => {
        const key = (e.key || '').toLowerCase();
        if (key) {
          this._activeKeys[key] = true;
          this._execHotKey();
        }
      });
      document.addEventListener('keyup', e => {
        const key = (e.key || '').toLowerCase();
        if (key) {
          this._activeKeys[key] = false;
        }
      });
    }
  },
};

hotKeysJob.addHotkeys(globalHotkeys);
hotKeysJob.addHotkeys(gwHotkeys);

export default hotKeysJob;
