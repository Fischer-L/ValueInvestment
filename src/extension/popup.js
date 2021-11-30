import messageBackground from './utils/messageBackground';

const stockInput = {
  _input: null,

  lookupStock(stockId) {
    if (!stockId) return;

    messageBackground({
      cmd: 'CMD_STOCK_TECHNICAL',
      params: { stockId },
    });
  },

  init() {
    if (this._input) return;

    this._input = document.getElementById('stockInput');

    this._input.addEventListener('keyup', e => {
      if (e.code === 'Enter') this.lookupStock(this._input.value);
    });
    this._input.focus();
  },
};
stockInput.init();
