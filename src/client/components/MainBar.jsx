import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Button } from 'semantic-ui-react';

import { loginManager } from '@/api/index';

import '@/css/MainBar.css';

class MainBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stockId: '',
      isLogin: loginManager.isLogin(),
      allowLogin: loginManager.allowLogin(),
    };

    this.onInputChange = (e) => {
      this.setState({ stockId: e.target.value });
    };

    this.onClick = async (e) => {
      const handlers = [ 'handleLogin', 'handleSubmit' ];
      let { target } = e;
      e.persist();
      while (target) {
        for (const handler of handlers) { // eslint-disable-line no-restricted-syntax
          if (await this[handler](e, target)) return; // eslint-disable-line no-await-in-loop
        }
        target = target.parentElement;
      }
    };
  }

  async handleLogin(e, target) {
    if (!target.classList.contains('mainBar-loginBtn')) return false;

    if (this.state.isLogin || !this.state.allowLogin) {
      await loginManager.logout();
    } else if (this.state.allowLogin) {
      await loginManager.login();
    }
    this.setState({
      isLogin: loginManager.isLogin(),
      allowLogin: loginManager.allowLogin(),
    });
    return true;
  }

  handleSubmit(e, target) {
    let submit = false;
    switch (e.type) {
      case 'click':
      case 'touchend':
        submit = target.classList.contains('search') && target.classList.contains('icon');
        break;

      case 'keypress':
        submit = e.key.toLowerCase() === 'enter';
        break;
    }
    if (!submit) return false;

    const { stockId } = this.state;
    if (stockId) {
      e.preventDefault();
      e.stopPropagation();
      this.props.onRequestStockValue({ stockId });
    }
    return true;
  }

  renderLoginButton() {
    const { isLogin, allowLogin } = this.state;
    if (!allowLogin) {
      return null;
    }
    return (
      <Button className="mainBar-loginBtn" animated="vertical">
        <Button.Content visible>{ isLogin ? 'Logout' : 'Login' }</Button.Content>
        <Button.Content hidden>{ isLogin ? 'Sell' : 'Buy' }</Button.Content>
      </Button>
    );
  }

  render() {
    return (
      <div className="mainBar" onClick={this.onClick} onKeyPress={this.onClick} onTouchEnd={this.onClick}>
        <Input
          className="mainBar-input"
          icon="search"
          size="small"
          placeholder="Search..."
          onChange={this.onInputChange}
        />
        { this.renderLoginButton() }
      </div>
    );
  }
}

MainBar.propTypes = {
  onRequestStockValue: PropTypes.func.isRequired,
};

export default MainBar;
