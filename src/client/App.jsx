import React, { Component } from 'react';

import 'semantic-ui-css/semantic.min.css';
import '@/css/App.scss';

import { apiClient, loginManager, getStockProvider } from '@/api/index';
import MainBar from '@/components/MainBar';
import NoteBoard from '@/components/NoteBoard';
import ValueBoard from '@/components/ValueBoard';
import BookmarkBoardTW from '@/components/BookmarkBoardTW';
import BookmarkBoardUS from '@/components/BookmarkBoardUS';
import MARKET_TYPE from '@/utils/marketType';
import Prompt, { ACTION } from '@/components/Prompt';

import icoDuck from '@/assets/ico_duck.jpg';
import icoHen from '@/assets/ico_hen.svg';
import icoLoading from '@/assets/ico_loading.svg';

const stockProvider = getStockProvider({ apiClient, domParser: new DOMParser() });

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      market: null,
      stockId: null,
      stockData: null,
      loadingData: false,
      showBookmarkBoard: null,
      askLogin: false,
      isLogin: loginManager.isLogin(),
      allowLogin: loginManager.allowLogin(),
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

    this.whenLookUpStock = async ({ stockId, market }) => {
      if (this.state.loadingData) {
        return;
      }

      let noCache = false;
      if (stockId.startsWith('-')) {
        noCache = true;
        stockId = stockId.substr(1);
      }
      stockId = stockId.toUpperCase();

      this.setState({ stockId, market, stockData: null, error: null });
      if (market !== MARKET_TYPE.TW) {
        return;
      }

      this.setState({ loadingData: true });
      try {
        const stockData = await stockProvider.get(stockId, noCache);
        if (stockId === stockData.id) {
          this.setState({ stockData });
        }
      } catch (e) {
        this.setState({ stockId: null, error: e.toString() });
      }
      this.setState({ loadingData: false });
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

    this.renderErrorComponent = msg => (
      <div className="appContent-error" key="appContent-error">
        <h3>Quack~something wrong.<br />Please search again</h3>
        <p>{msg}</p>
        <img src={icoDuck} width="32px" alt="Duck..." />
      </div>
    );

    this.renderLoadingComponent = () => (
      <div className="appContent-loading" key="appContent-loading">
        <img src={icoLoading} width="52px" alt="Loading..." />
      </div>
    );

    this.renderBeginComponent = () => (
      <div className="appContent-begin" key="appContent-begin">
        <img src={icoHen} width="88px" alt="Hen..." />
        <p>Enter the id of the stock to look up</p>
      </div>
    );

    this.renderValueBoard = ({ stockId, stockData }) => <ValueBoard stockId={stockId} stockData={stockData} key="ValueBoard" />;

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
    };
  }

  render() {
    const { stockId, market, error, isLogin, allowLogin, loadingData } = this.state;

    const appContent = [];
    if (error) {
      appContent.push(this.renderErrorComponent(error));
    } else if (!stockId) {
      appContent.push(this.renderBeginComponent());
    } else {
      if (loadingData) {
        appContent.push(this.renderLoadingComponent());
      } else if (market === MARKET_TYPE.TW) {
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
      </div>
    );
  }
}

export default App;
