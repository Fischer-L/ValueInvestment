import React from 'react';
import PropTypes from 'prop-types';
import { Input, Button, Icon } from 'semantic-ui-react';

import MARKET_TYPE from '@/utils/marketType';
import Prompt, { ACTION } from '@/components/Prompt';
import ClickableComponent from '@/components/subcomponents/ClickableComponent';
import '@/css/MainBar.scss';

class MainBar extends ClickableComponent {
  constructor(props) {
    super(props);

    this.state = {
      stockId: '',
      promptConfig: null,
    };

    this.onInputChange = (e) => {
      this.setState({ stockId: e.target.value });
    };

    this.onToggleBookmarkTW = this.onClickDo(() => this.fireCallback('whenToggleBookmark', { market: MARKET_TYPE.TW }));
    this.onToggleBookmarkUS = this.onClickDo(() => this.fireCallback('whenToggleBookmark', { market: MARKET_TYPE.US }));

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
        this.fireCallback('whenLookUpStock', {
          stockId,
          market: Number.isNaN(parseInt(stockId, 10)) ? MARKET_TYPE.US : MARKET_TYPE.TW,
        });
      }
    });

    this.onClickExtensionIdBtn = this.onClickDo(() => {
      this.setState({ promptConfig: {
        title: 'Extension ID',
        onClose: ({ action, input }) => {
          if (action === ACTION.OK && input) {
            this.fireCallback('whenUpdateExtensionId', input);
          }
        },
      } });
    });
  }

  renderPrompt() {
    if (this.state.promptConfig) {
      const { title, onClose } = this.state.promptConfig;
      const onClosePrompt = (msg) => {
        this.setState({ promptConfig: null });
        onClose(msg);
      };
      return <Prompt hasInput title={title} onClose={onClosePrompt} />;
    }
    return null;
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

  renderBookmarkBtn({ title, onClick }) {
    return (
      <button className="mainBar-Btn" onClick={onClick} onTouchEnd={onClick} type="button">
        <Icon className="mainBar-Btn-icon" name="bookmark outline" size="large" />
        <p>{title}</p>
      </button>
    );
  }

  renderExtensionIdBtn() {
    return (
      <button className="mainBar-Btn" onClick={this.onClickExtensionIdBtn} onTouchEnd={this.onClickExtensionIdBtn} type="button">
        <Icon className="mainBar-Btn-icon" name="meh outline" size="large" />
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
          { this.renderBookmarkBtn({ title: 'tw', onClick: this.onToggleBookmarkTW }) }
          { this.renderBookmarkBtn({ title: 'us', onClick: this.onToggleBookmarkUS }) }
          { this.renderExtensionIdBtn() }
          { this.renderLoginButton() }
          { this.renderPrompt() }
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
  whenUpdateExtensionId: PropTypes.func,
};

export default MainBar;
