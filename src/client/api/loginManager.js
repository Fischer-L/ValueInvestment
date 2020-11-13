import { cookies } from '@/utils';
import { apiClient } from '@/api/index';
import { LOCAL_PORT, LOGIN_CLIENT_KEY, LOGIN_CLIENT_VALUE } from '~/build/config_client';

const loginManager = {
  allowLogin() {
    return window.location.protocol === 'https:' || window.location.host === `localhost:${LOCAL_PORT}`;
  },

  isLogin() {
    return cookies.get(LOGIN_CLIENT_KEY) === LOGIN_CLIENT_VALUE;
  },

  async _handleResponse(doRequest) {
    let resp = null;
    try {
      resp = await doRequest();
      if (resp.status === 200) {
        return true;
      }
    } catch (e) {
      alert(e.response.data);
      console.error(e);
    }
    return false;
  },

  async login(passcode) {
    if (this.isLogin()) {
      return true;
    }
    if (!this.allowLogin()) {
      return false;
    }
    return this._handleResponse(() => apiClient.post('/login', { pc: passcode }));
  },

  async logout() {
    if (this.isLogin()) {
      return this._handleResponse(() => apiClient.post('/logout'));
    }
    return true;
  },
};

export default loginManager;
