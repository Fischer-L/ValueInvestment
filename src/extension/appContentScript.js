import messageBackground from './utils/messageBackground';

const EXTENSION_VERSION = '1.5.1';

window.addEventListener('message', async function (event) {
  if (event.source !== window) return; // We only accept messages from ourselves

  const data = event.data;

  if (!data || data.from !== 'web') return;

  let resp = null;
  try {
    if (data.body.cmd === 'CMD_EXTENSION_ACK') {
      const { CLIENT_VERSION } = data.body.params || {};
      if (CLIENT_VERSION !== EXTENSION_VERSION) {
        throw new Error(`CLIENT_VERSION: ${CLIENT_VERSION} mismatches EXTENSION_VERSION: ${EXTENSION_VERSION}`);
      }
      resp = data.body;
    } else {
      resp = await messageBackground(data.body);
    }
  } catch (e) {
    resp = { error: e.toString() };
  }
  window.postMessage({ from: 'extension', body: resp });
});
