import axios from 'axios';
import loginManager from './loginManager';
import getStockProvider from './stockProvider/index';

const apiClient = axios.create({
  baseURL: window.location.origin,
  timeout: 10000,
});

const extensionClient = {
  _version: '1.3',

  async talkToExtension(msgBody) {
    let extension;
    if (!this._extensionACK) {
      extension = await this._helloExtension();
    } else if (this._extensionACK.asked) {
      extension = await this._helloExtension();
    } else {
      // Not yet ask so let the request pass
    }
    if (extension === false) {
      return null;
    }
    return new Promise(resolve => {
      const onMsg = evt => {
        if (evt.data && evt.data.from === 'extension') {
          window.removeEventListener('message', onMsg);
          resolve(evt.data.body);
        }
      };
      window.addEventListener('message', onMsg);
      window.postMessage({ from: 'web', body: msgBody });
    });
  },

  _helloExtension() {
    if (!this._extensionACK) {
      this._extensionACK = {
        asked: false,
        timeout: null,
      };
      this._extensionACK.promise = new Promise(resolve => {
        this.talkToExtension({ cmd: 'CMD_EXTENSION_ACK', params: { CLIENT_VERSION: this._version } })
          .then(resp => {
            clearTimeout(this._extensionACK.timeout);
            if (resp.error) {
              return Promise.reject(resp.error);
            }
            resolve(true);
          })
          .catch(e => {
            clearTimeout(this._extensionACK.timeout);
            console.error(e);
            resolve(false);
          });
        this._extensionACK.timeout = setTimeout(() => {
          console.warn('No ACK from the extension');
          resolve(false);
        }, 100);
        this._extensionACK.asked = true;
      });
    }
    return this._extensionACK.promise;
  },
};

export {
  apiClient,
  extensionClient,
  loginManager,
  getStockProvider,
};
