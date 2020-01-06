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

    this.onClickBookmarkBtn = this.onClickDo(() => this.fireCallback('onClickBookmarkBtn'));

    this.onRequestLogin = this.onClickDo(() => this.fireCallback('onRequestLogin'));

    this.onRequestStockValue = this.onClickDo(e => {
      let submit = false;
      switch (e.type) {
        case 'click':
        case 'touchend':
          submit = e.target.classList.contains('search') && e.target.classList.contains('icon');
          break;

        case 'keypress':
          submit = e.key.toLowerCase() === 'enter';
          break;
      }
      const { stockId } = this.state;
      if (submit && stockId) {
        this.fireCallback('onRequestStockValue', { stockId });
      }
    });
  }

  renderLoginButton() {
    const { isLogin, allowLogin } = this.props;
    if (!allowLogin) {
      return null;
    }
    return (
      <Button className="mainBar-loginBtn" animated="vertical" onClick={this.onRequestLogin} onTouchEnd={this.onRequestLogin}>
        <Button.Content visible>{ isLogin ? 'Logout' : 'Login' }</Button.Content>
        <Button.Content hidden>{ isLogin ? 'Sell' : 'Buy' }</Button.Content>
      </Button>
    );
  }

  render() {
    return (
      <div className="mainBar" onClick={this.onRequestStockValue} onKeyPress={this.onRequestStockValue} onTouchEnd={this.onRequestStockValue}>
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
          <Button className="mainBar-bookmarkBtn" icon="bookmark" onClick={this.onClickBookmarkBtn} onTouchEnd={this.onClickBookmarkBtn} />
          { this.renderLoginButton() }
        </section>
      </div>
    );
  }
}

MainBar.propTypes = {
  isLogin: PropTypes.bool,
  allowLogin: PropTypes.bool,
  onRequestLogin: PropTypes.func,
  onClickBookmarkBtn: PropTypes.func,
  onRequestStockValue: PropTypes.func,
};

export default MainBar;
