import getURL, { SITE } from '~/utils/getURL';

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
hotKeysManager.hotKeys.push({
  targetKeys: [ 'meta', '\'', 'enter' ],
  isTargetPage() {
    return true;
  },
  exec() {
    const input = (window.prompt('Enter id') || '').trim();
    if (!input) {
      return;
    }

    let urls = [];
    let [ instructions, stockId ] = input.split(' ');

    if (!stockId && instructions) {
      stockId = instructions;
      instructions = 't';
    }

    if (instructions) {
      for (let i = 0; i < instructions.length; i++) {
        switch (instructions[i]) {
          case 'h':
            urls.push(getURL(SITE.big_holder, { stockId }));
            break;

          case 'i':
            urls.push(getURL(SITE.info, null, { stockId }));
            break;

          case 'm':
            urls.push(getURL(SITE.margin, { stockId }));
            break;

          case 'f':
            urls.push(getURL(SITE.forum, null, { stockId }));
            break;

          case 't': default:
            urls.push(getURL(SITE.technical, null, { stockId }));
            break;
        }
      }
    }

    urls.forEach(url => messageBackground({
      cmd: 'CMD_OPEN_URL',
      params: { url },
    }));
  },
});
hotKeysManager.init();
