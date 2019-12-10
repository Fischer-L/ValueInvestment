import React from 'react';
import PropTypes from 'prop-types';
import { Input, Button } from 'semantic-ui-react';

import ClickableComponent from '@/components/subcomponents/ClickableComponent';
import '@/css/MainBar.scss';

class MainBar extends ClickableComponent {
  constructor(props) {
    super(props);

    this.state = {
      stockId: '',
    };

    this.onInputChange = (e) => {
      this.setState({ stockId: e.target.value });
    };

    this._stopTraversingDOM = (e, target) => target.classList.contains('mainBar');

    this.onClickBookmarkBtn = (e, target) => {
      if (target.classList.contains('mainBar-bookmarkBtn')) {
        this.fireEvent('onClickBookmarkBtn');
        return true;
      }
      return false;
    };

    this.onRequestLogin = (e, target) => {
      if (target.classList.contains('mainBar-loginBtn')) {
        this.fireEvent('onRequestLogin');
        return true;
      }
      return false;
    };

    this.onRequestStockValue = (e, target) => {
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
        this.fireEvent('onRequestStockValue', { stockId });
      }
      return true;
    };

    this.regisHandler(this.onClickBookmarkBtn, this.onRequestLogin, this.onRequestStockValue);
  }

  renderLoginButton() {
    const { isLogin, allowLogin } = this.props;
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
        <section className="mainBar-inputHolder">
          <Input
            className="mainBar-input"
            icon="search"
            size="small"
            placeholder="Search..."
            onChange={this.onInputChange}
          />
        </section>
        <section className="mainBar-buttonsArea">
          <Button className="mainBar-bookmarkBtn" icon="bookmark" />
          { this.renderLoginButton() }
        </section>
      </div>
    );
  }
}

MainBar.propTypes = {
  isLogin: PropTypes.bool,
  allowLogin: PropTypes.bool,
};

export default MainBar;
