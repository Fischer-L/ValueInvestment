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

    const cmds = [];
    let [ instructions, stockId ] = input.split(' ');

    if (!stockId && instructions) {
      stockId = instructions;
      instructions = 't';
    }

    if (instructions === '`') {
      instructions = '?tif';
    }

    if (stockId && instructions) {
      for (let i = instructions.length - 1; i >= 0; i--) {
        switch (instructions[i]) {
          case '?':
            cmds.push({
              cmd: 'CMD_WHAT_IS_STOCK',
              params: {
                stockId,
              },
            });
            break;

          case 'h':
            cmds.push({
              cmd: 'CMD_OPEN_URL',
              params: {
                url: getURL(SITE.big_holder, { stockId }),
              },
            });
            break;

          case 'f':
            cmds.push({
              cmd: 'CMD_OPEN_URL',
              params: {
                url: getURL(SITE.tw_finance, null, { stockId }),
              },
            });
            break;

          case 'i':
            cmds.push({
              cmd: 'CMD_OPEN_URL',
              params: {
                url: getURL(SITE.info, null, { stockId }),
              },
            });
            break;

          case 'm':
            cmds.push({
              cmd: 'CMD_OPEN_URL',
              params: {
                url: getURL(SITE.margin, { stockId }),
              },
            });
            break;

          case 'd':
            cmds.push({
              cmd: 'CMD_OPEN_URL',
              params: {
                url: getURL(SITE.forum, null, { stockId }),
              },
            });
            break;

          case 't': default:
            cmds.push({
              cmd: 'CMD_OPEN_URL',
              params: {
                url: getURL(SITE.technical, null, { stockId }),
              },
            });
            break;
        }
      }
    }

    cmds.forEach(cmd => messageBackground(cmd));
  },
});
hotKeysManager.init();
