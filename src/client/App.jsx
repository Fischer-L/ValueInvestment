import React, { Component } from 'react';

import 'semantic-ui-css/semantic.min.css';
import '@/css/App.scss';

import { loginManager } from '@/api/index';
import MARKET_TYPE from '@/utils/marketType';
import MainBar from '@/components/MainBar';
import NoteBoard from '@/components/NoteBoard';
import ValueBoard from '@/components/ValueBoard';
import BookmarkBoardTW from '@/components/BookmarkBoardTW';
import BookmarkBoardUS from '@/components/BookmarkBoardUS';
import Prompt, { ACTION } from '@/components/Prompt';
import CalculationPanel from '@/components/CalculationPanel';

import icoHen from '@/assets/ico_hen.svg';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      market: '',
      stockId: null,
      extensionId: null,
      showBookmarkBoard: null,
      askLogin: false,
      lookupTime: 0,
      isLogin: loginManager.isLogin(),
      allowLogin: loginManager.allowLogin(),
    };

    this.whenLookUpStock = ({ stockId, market }) => {
      this.setState({ stockId, market, lookupTime: Date.now() });
    };

    this.whenToggleBookmark = ({ market }) => {
      this.setState((prevState) => {
        const showBookmarkBoard = prevState.showBookmarkBoard === market ? null : market;
        document.body.style.overflow = showBookmarkBoard ? 'hidden' : '';
        return { showBookmarkBoard };
      });
    };

    this.whenCloseBookmark = () => {
      this.whenToggleBookmark({ market: this.state.showBookmarkBoard });
    };

    this.whenUpdateExtensionId = extensionId => {
      this.setState({ extensionId });
    };

    this.whenLogin = async () => {
      const { isLogin, askLogin, allowLogin } = this.state;
      if (isLogin || !allowLogin) {
        await loginManager.logout();
        this.setState({
          isLogin: loginManager.isLogin(),
          allowLogin: loginManager.allowLogin(),
        });
      } else if (!isLogin && !askLogin && allowLogin) {
        this.setState({ askLogin: true });
      }
    };

    this.onLoginPromptClose = async ({ action, input }) => {
      this.setState({ askLogin: false });
      if (action === ACTION.OK && input) {
        await loginManager.login(input);
        this.setState({
          isLogin: loginManager.isLogin(),
          allowLogin: loginManager.allowLogin(),
        });
      }
    };

    this.renderBeginComponent = () => (
      <div className="appContent-begin" key="appContent-begin">
        <img src={icoHen} width="88px" alt="Hen..." />
        <p>Enter the stock id to look up</p>
      </div>
    );

    this.renderValueBoard = ({ stockId, extensionId, market, lookupTime }) => <ValueBoard stockId={stockId} extensionId={extensionId} market={market} lookupTime={lookupTime} key="ValueBoard" />;

    this.renderNoteBoard = ({ stockId, isLogin, allowLogin }) => {
      if (allowLogin && isLogin) {
        return <NoteBoard key="NoteBoard" stockId={stockId} />;
      }
      return null;
    };

    this.renderBookmarkBoards = ({ showBookmarkBoard }) => {
      const boards = [];

      const propsOfBookmarkBoardTW = {
        whenLookUpStock: this.whenLookUpStock,
        whenCloseBookmark: this.whenCloseBookmark,
        show: showBookmarkBoard === MARKET_TYPE.TW,
      };
      boards.push(<BookmarkBoardTW key="BookmarkBoardTW" {...propsOfBookmarkBoardTW} />);

      const propsOfBookmarkBoardUS = {
        whenLookUpStock: this.whenLookUpStock,
        whenCloseBookmark: this.whenCloseBookmark,
        show: showBookmarkBoard === MARKET_TYPE.US,
      };
      boards.push(<BookmarkBoardUS key="BookmarkBoardUS" {...propsOfBookmarkBoardUS} />);

      return boards;
    };

    this.renderLoginPrompt = ({ isLogin, askLogin, allowLogin }) => {
      if (!isLogin && askLogin && allowLogin) {
        return <Prompt hasInput title="Passcode" onClose={this.onLoginPromptClose} />;
      }
      return null;
    };

    this.mainBarCallbacks = {
      whenLogin: this.whenLogin,
      whenLookUpStock: this.whenLookUpStock,
      whenToggleBookmark: this.whenToggleBookmark,
      whenUpdateExtensionId: this.whenUpdateExtensionId,
    };
  }

  render() {
    const appContent = [];
    const { stockId, market, isLogin, allowLogin } = this.state;

    if (!stockId) {
      appContent.push(this.renderBeginComponent());
    } else {
      if (market === MARKET_TYPE.TW) {
        appContent.push(this.renderValueBoard(this.state));
      }
      appContent.push(this.renderNoteBoard(this.state));
    }
    appContent.push(...this.renderBookmarkBoards(this.state));

    return (
      <div className="app">
        <MainBar isLogin={isLogin} allowLogin={allowLogin} {...this.mainBarCallbacks} />
        <section className="appContent">
          {appContent}
        </section>
        { this.renderLoginPrompt(this.state) }
        <CalculationPanel />
      </div>
    );
  }
}

export default App;
