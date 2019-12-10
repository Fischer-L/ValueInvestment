import React, { Component } from 'react';

import 'semantic-ui-css/semantic.min.css';
import '@/css/App.scss';

import { apiClient, loginManager, getStockProvider } from '@/api/index';
import MainBar from '@/components/MainBar';
import NoteBoard from '@/components/NoteBoard';
import ValueBoard from '@/components/ValueBoard';
import BookmarkBoard from '@/components/BookmarkBoard';

import icoDuck from '@/assets/ico_duck.jpg';
import icoHen from '@/assets/ico_hen.svg';
import icoLoading from '@/assets/ico_loading.svg';

const stockProvider = getStockProvider({ apiClient, domParser: new DOMParser() });

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      stockId: null,
      stockData: null,
      showBookmarkBoard: false,
      isLogin: loginManager.isLogin(),
      allowLogin: loginManager.allowLogin(),
    };

    this.onRequestCloseBookmark = this.onClickBookmarkBtn = () => {
      this.setState((prevState) => {
        const showBookmarkBoard = !prevState.showBookmarkBoard;
        document.body.style.overflow = showBookmarkBoard ? 'hidden' : '';
        return { showBookmarkBoard };
      });
    };

    this.onRequestLookupStock = this.onRequestStockValue = async ({ stockId }) => {
      let noCache = false;
      if (stockId.toLowerCase().startsWith('n')) {
        noCache = true;
        stockId = stockId.substr(1);
      }
      this.setState({ stockId, stockData: null, error: null });
      try {
        const stockData = await stockProvider.get(stockId, noCache);
        if (stockId === stockData.id) {
          this.setState({ stockData });
        }
      } catch (e) {
        this.setState({ stockId: null, error: e.toString() });
      }
    };

    this.onRequestLogin = async () => {
      if (this.state.isLogin || !this.state.allowLogin) {
        await loginManager.logout();
      } else if (this.state.allowLogin) {
        await loginManager.login();
      }
      this.setState({
        isLogin: loginManager.isLogin(),
        allowLogin: loginManager.allowLogin(),
      });
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

    this.renderBoards = ({ stockId, stockData, isLogin, allowLogin }) => {
      const boards = [ <ValueBoard stockId={stockId} stockData={stockData} key="ValueBoard" /> ];
      if (allowLogin && isLogin && false) {
        boards.push(<NoteBoard key="NoteBoard" />);
      }
      return boards;
    };

    this.mainBarCallbacks = {
      onRequestLogin: this.onRequestLogin,
      onClickBookmarkBtn: this.onClickBookmarkBtn,
      onRequestStockValue: this.onRequestStockValue,
    };

    this.bookmarkBoardCallbacks = {
      onRequestLookupStock: this.onRequestLookupStock,
      onRequestCloseBookmark: this.onRequestCloseBookmark,
    };
  }

  render() {
    let appContent = [];
    const { stockId, stockData, error, isLogin, allowLogin } = this.state;
    if (error) {
      appContent.push(this.renderErrorComponent(error));
    } else if (stockId && !stockData) {
      appContent.push(this.renderLoadingComponent());
    } else if (stockId && stockData) {
      appContent = this.renderBoards(this.state);
    } else {
      appContent.push(this.renderBeginComponent());
    }
    appContent.push(<BookmarkBoard key="BookmarkBoard" show={this.state.showBookmarkBoard} {...this.bookmarkBoardCallbacks} />);

    return (
      <div className="app">
        <MainBar isLogin={isLogin} allowLogin={allowLogin} {...this.mainBarCallbacks} />
        <section className="appContent">{appContent}</section>
      </div>
    );
  }
}

export default App;
