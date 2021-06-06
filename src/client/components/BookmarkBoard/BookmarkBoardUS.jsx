import React from 'react';
import PropTypes from 'prop-types';

import MARKET_TYPE from '@/utils/marketType';
import bookmarkProvider, { BOOKMARK_TYPE } from '@/api/bookmarkProvider';
import BookmarkBoard, { StocksBookmark } from '@/components/BookmarkBoard/BookmarkBoard';
import ClickableComponent from '@/components/subcomponents/ClickableComponent';

class BookmarkBoardUS extends ClickableComponent {
  constructor(props) {
    super(props);

    this.state = {
      stocks: [],
    };

    this.whenRemoveStock = ({ id }) => {
      bookmarkProvider.remove(BOOKMARK_TYPE.STOCK, id).then(() => this.populateStocks());
    };

    this.whenBookmark = ({ id, name }) => {
      if (!id || !name) {
        throw new Error('Bookmark a US stock without enough params: id, name', id, name);
      }
      id = id.toUpperCase();
      bookmarkProvider.put(BOOKMARK_TYPE.STOCK, id, { id, name, market: MARKET_TYPE.US }).then(() => this.populateStocks());
    };

    this._whenLookUpStock = ({ stockId }) => {
      this.fireCallback('whenLookUpStock', { stockId, market: MARKET_TYPE.US });
    };

    this.populateStocks = () => {
      bookmarkProvider.toArray(BOOKMARK_TYPE.STOCK).then(stocks => {
        this.setState({ stocks: stocks.filter(s => s.market === MARKET_TYPE.US) });
      });
    };

    this.populateStocks();
  }

  render() {
    const { stocks } = this.state;

    const { show, whenCloseBookmark } = this.props;
    const bookmarkBoardProps = { show, whenCloseBookmark, whenBookmark: this.whenBookmark, placeholder: 'AAPL Apple' };

    return (
      <BookmarkBoard {...bookmarkBoardProps}>
        <StocksBookmark stocks={stocks} market={MARKET_TYPE.US} whenLookUpStock={this._whenLookUpStock} whenRemoveStock={this.whenRemoveStock} />
      </BookmarkBoard>
    );
  }
}
BookmarkBoardUS.propTypes = {
  show: PropTypes.bool,
  whenLookUpStock: PropTypes.func,
  whenCloseBookmark: PropTypes.func,
};

export default BookmarkBoardUS;
