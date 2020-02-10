import React from 'react';
import PropTypes from 'prop-types';
import { Input, Button, Icon } from 'semantic-ui-react';

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

    this.onClickBookmarkBtn = this.onClickDo(() => this.fireCallback('whenToggleBookmark'));

    this.onLogin = this.onClickDo(() => this.fireCallback('whenLogin'));

    this.onLookUpStock = this.onClickDo(e => {
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
        this.fireCallback('whenLookUpStock', { stockId });
      }
    });
  }

  renderLoginButton() {
    const { isLogin, allowLogin } = this.props;
    if (!allowLogin) {
      return null;
    }
    return (
      <Button className="mainBar-loginBtn" onClick={this.onLogin} onTouchEnd={this.onLogin}>
        { isLogin ? 'Logout' : 'Login' }
      </Button>
    );
  }

  renderBookmarkBtn({ iconName, title, onClick }) {
    return (
      <button className="mainBar-Btn" onClick={onClick} onTouchEnd={onClick} type="button">
        <Icon className="mainBar-Btn-icon" name={iconName} size="large" />
        <p>{title}</p>
      </button>
    );
  }

  render() {
    return (
      <div className="mainBar" onClick={this.onLookUpStock} onKeyPress={this.onLookUpStock} onTouchEnd={this.onLookUpStock}>
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
          { this.renderBookmarkBtn({ title: 'tw', iconName: 'bookmark outline', onClick: this.onClickBookmarkBtn }) }
          { this.renderLoginButton() }
        </section>
      </div>
    );
  }
}

MainBar.propTypes = {
  isLogin: PropTypes.bool,
  allowLogin: PropTypes.bool,
  whenLogin: PropTypes.func,
  whenLookUpStock: PropTypes.func,
  whenToggleBookmark: PropTypes.func,
};

export default MainBar;
