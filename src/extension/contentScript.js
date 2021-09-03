import messageBackground from './utils/messageBackground';

const EXTENSION_VERSION = '1.4.1';

window.addEventListener('message', async function (event) {
  if (event.source !== window) return; // We only accept messages from ourselves

  const data = event.data;

  if (!data || data.from !== 'web') return;

  let resp = null;
  try {
    switch (data.body.cmd) {
      case 'CMD_STOCK_DATA':
        resp = await messageBackground(data.body);
        break;

      case 'CMD_EXTENSION_ACK':
        const { CLIENT_VERSION } = data.body.params || {};
        if (CLIENT_VERSION !== EXTENSION_VERSION) {
          throw new Error(`CLIENT_VERSION: ${CLIENT_VERSION} mismatches EXTENSION_VERSION: ${EXTENSION_VERSION}`);
        }
        resp = data.body;
        break;
    }
  } catch (e) {
    resp = { error: e.toString() };
  }
  window.postMessage({ from: 'extension', body: resp });
});
