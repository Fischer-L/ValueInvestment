import React from 'react';
import PropTypes from 'prop-types';

import MARKET_TYPE from '@/utils/marketType';
import bookmarkProvider, { BOOKMARK_TYPE } from '@/api/bookmarkProvider';
import BookmarkBoard, { StocksBookmark, PttUsersBookmark } from '@/components/BookmarkBoard/BookmarkBoard';
import ClickableComponent from '@/components/subcomponents/ClickableComponent';

class BookmarkBoardTW extends ClickableComponent {
  constructor(props) {
    super(props);

    this.state = {
      pttUsers: [],
      stocks: [],
    };

    this.decodeInput = input => {
      const [ id, ...names ] = input.trim().split(' ');
      return {
        id,
        name: names.join(' '),
      };
    };

    this.whenBookmark = (input) => {
      const { id, name } = this.decodeInput(input);
      if (name) {
        bookmarkProvider.put(BOOKMARK_TYPE.STOCKS, id, { id, name }).then(() => this.populateStocks());
      } else {
        bookmarkProvider.put(BOOKMARK_TYPE.PTT_USERS, id, { id }).then(() => this.populatePttUsers());
      }
    };

    this.whenRemovePttUser = ({ id }) => {
      bookmarkProvider.remove(BOOKMARK_TYPE.PTT_USERS, id).then(() => this.populatePttUsers());
    };

    this.whenRemoveStock = ({ stockId }) => {
      bookmarkProvider.remove(BOOKMARK_TYPE.STOCKS, stockId).then(() => this.populateStocks());
    };

    this._whenLookUpStock = ({ stockId }) => {
      this.fireCallback('whenLookUpStock', { stockId, market: MARKET_TYPE.TW });
    };

    this.populatePttUsers = () => {
      bookmarkProvider.toArray(BOOKMARK_TYPE.PTT_USERS).then(pttUsers => this.setState({ pttUsers }));
    };

    this.populateStocks = () => {
      bookmarkProvider.toArray(BOOKMARK_TYPE.STOCKS).then(stocks => {
        this.setState({ stocks: stocks.filter(s => s.market === MARKET_TYPE.TW) });
      });
    };

    this.populatePttUsers();
    this.populateStocks();
  }

  render() {
    const { pttUsers, stocks } = this.state;
    const { show, whenCloseBookmark } = this.props;
    const bookmarkBoardProps = { show, whenCloseBookmark, whenBookmark: this.whenBookmark, placeholder: '2330 台積電' };
    return (
      <BookmarkBoard {...bookmarkBoardProps}>
        <PttUsersBookmark pttUsers={pttUsers} whenRemovePttUser={this.whenRemovePttUser} />
        <StocksBookmark stocks={stocks} market={MARKET_TYPE.TW} whenLookUpStock={this._whenLookUpStock} whenRemoveStock={this.whenRemoveStock} />
      </BookmarkBoard>
    );
  }
}
BookmarkBoardTW.propTypes = {
  show: PropTypes.bool,
  whenLookUpStock: PropTypes.func,
  whenCloseBookmark: PropTypes.func,
};

export default BookmarkBoardTW;
