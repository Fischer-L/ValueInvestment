import getURL, { SITE } from '~/utils/getURL';
import messageBackground from './messageBackground';

const globalHotkeys = [{
  targetKeys: [ 'meta', '\'', 'enter' ],

  isTargetPage() {
    return true;
  },

  exec() {
    const input = (window.prompt('Enter id') || '').trim();
    if (!input) {
      return;
    }

    let [ instructions, ...stockIds ] = input.split(' ');

    if (instructions === '`') {
      // case: '` 5678' or '` 5678 8765'
      instructions = '?tf';
    } else if (!Number.isNaN(parseInt(instructions, 10))) {
      // case: '5678' or '5678 8765'
      stockIds = input.split(' ');
      instructions = 't';
    }
    stockIds.forEach(stockId => this._exec(stockId, instructions));
  },

  _exec(stockId, instructions) {
    const cmds = [];

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

    cmds.forEach(cmd => messageBackground(cmd));
  },
}];

export default globalHotkeys;
