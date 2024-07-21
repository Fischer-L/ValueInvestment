/* eslint react/no-this-in-sfc: off */
import getURL, { SITE } from '~/utils/getURL';
import getStockProfile from '~/api/getStockProfile';

function createTab(url) {
  chrome.tabs.create({
    url,
    index: 0,
    active: true,
  });
}

chrome.runtime.onMessage.addListener((msg, sender, sendResp) => {
  const { cmd, params } = msg;
  switch (cmd) {

    case 'CMD_OPEN_URL':
      createTab(params.url);
      sendResp(true);
      break;

    case 'CMD_WHAT_IS_STOCK':
      getStockProfile(params.stockId).then(({ name }) => {
        createTab(getURL(SITE.what_story, { name }));
        createTab(getURL(SITE.what_is, { name }));
      });
      createTab(getURL(SITE.info, null, { stockId: params.stockId }));
      sendResp(true);
      break;
  }
  return true;
});
