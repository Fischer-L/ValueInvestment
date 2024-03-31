/* eslint react/no-this-in-sfc: off */
import getURL, { SITE } from '~/utils/getURL';
import getStockProfile from '~/api/getStockProfile';

chrome.runtime.onMessage.addListener((msg, sender, sendResp) => {
  const { cmd, params } = msg;
  switch (cmd) {

    case 'CMD_OPEN_URL':
      chrome.tabs.create({
        url: params.url,
        index: 0,
        active: true,
      });
      sendResp(true);
      break;

    case 'CMD_WHAT_IS_STOCK':
      getStockProfile(params.stockId).then(({ name }) => chrome.tabs.create({
        url: getURL(SITE.what_is, { name }),
        index: 0,
        active: true,
      }));
      sendResp(true);
      break;
  }
  return true;
});
