import giURL, { PATH_TYPE } from './utils/giURL';

const stockListTable = {
  trialCounts: 0,

  id: [ 'tx', 'tStoc', 'kList', 'Data' ].join(''),

  enlarge() {
    const tableContainer = document.querySelector(`#${this.id} > div`);
    if (!tableContainer && this.trialCounts < 10) {
      setTimeout(() => this.enlarge, 330);
      this.trialCounts++;
      return;
    }
    this.trialCounts = 0;

    if (tableContainer) {
      tableContainer.style.width = 'auto';
    }
  },

  isTargetPage() {
    return window.location.href.startsWith(giURL(PATH_TYPE.LIST));
  },
};

window.addEventListener('load', async function () {
  if (stockListTable.isTargetPage()) {
    stockListTable.enlarge();
  }
});
