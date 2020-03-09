import React from 'react';
import PropTypes from 'prop-types';

import MARKET_TYPE from '@/utils/marketType';
import bookmarkProvider, { BOOKMARK_TYPE } from '@/api/bookmarkProvider';
import BookmarkBoard, { StocksBookmark, PttUsersBookmark } from '@/components/BookmarkBoard';
import ClickableComponent from '@/components/subcomponents/ClickableComponent';

class BookmarkBoardTW extends ClickableComponent {
  constructor(props) {
    super(props);

    this.state = {
      pttUsers: [],
      stocks: [],
    };

    this.whenRemovePttUser = ({ id }) => {
      bookmarkProvider.remove(BOOKMARK_TYPE.PTT_USER, id).then(() => this.populatePttUsers());
    };

    this.whenRemoveStock = ({ id }) => {
      bookmarkProvider.remove(BOOKMARK_TYPE.STOCK, id).then(() => this.populateStocks());
    };

    this.whenBookmark = ({ values }) => {
      if (values.length > 1) {
        const bookmarkPayload = {};
        if (Number.isNaN(parseInt(values[1], 10))) {
          bookmarkPayload.id = values[0];
          bookmarkPayload.name = values[1];
        } else {
          bookmarkPayload.id = values[1];
          bookmarkPayload.name = values[0];
        }
        bookmarkProvider.put(BOOKMARK_TYPE.STOCK, bookmarkPayload.id, bookmarkPayload)
          .then(() => this.populateStocks());
      } else if (values.length === 1) {
        const id = values[0];
        bookmarkProvider.put(BOOKMARK_TYPE.PTT_USER, id, { id }).then(() => this.populatePttUsers());
      }
    };

    this._whenLookUpStock = ({ stockId }) => {
      this.fireCallback('whenLookUpStock', { stockId, market: MARKET_TYPE.TW });
    };

    this.populatePttUsers = () => {
      bookmarkProvider.toArray(BOOKMARK_TYPE.PTT_USER).then(pttUsers => this.setState({ pttUsers }));
    };

    this.populateStocks = () => {
      bookmarkProvider.toArray(BOOKMARK_TYPE.STOCK).then(stocks => {
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
