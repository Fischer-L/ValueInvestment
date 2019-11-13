import React from 'react';
import PropTypes from 'prop-types';
import { List, Icon, Input } from 'semantic-ui-react';

import bookmarkProvider from '@/api/bookmarkProvider';
import StockLinks from '@/components/StockLinks';
import EventDispatcher from '@/components/subcomponents/EventDispatcher';

import '@/css/BookmarkBoard.scss';

class BookmarkBoard extends EventDispatcher {
  constructor(props) {
    super(props);

    this.state = {
      bookmarks: [],
      stockIdToLookup: '',
      bookmarkInputString: '',
    };
    this.populateBookmarks();

    this.onClick = (e) => {
      if (e.type === 'touchend') {
        this._isTouchHandled = true;
      }
      if (e.type === 'click' && this._isTouchHandled) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      const handlers = [ 'onClickBakground', 'onBookmarkStock', 'onRequestLookupStock', 'onClickRemoveBookmarkBtn' ];
      const { target } = e;
      e.persist();
      for (const handler of handlers) { // eslint-disable-line no-restricted-syntax
        if (this[handler](e, target)) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }
      }
    };

    this.onInputChange = (e) => {
      this.setState({ bookmarkInputString: e.target.value });
    };
  }

  onAskForURLs({ urls }) {
    this.setState({ stockIdToLookup: '' });
    for (let i = urls.length - 1; i >= 0; --i) {
      window.open(urls[i], '_blank');
    }
  }

  onRequestLookupStock(e, target) {
    if (target.classList.contains('bookmark-lookupBtn')) {
      const stockId = e.target.dataset.id;
      this.setState({ stockIdToLookup: stockId });
      this.fireEvent('onRequestLookupStock', { stockId });
      this.fireEvent('onRequestCloseBookmark');
      return true;
    }
    return false;
  }

  onClickBakground(e, target) {
    if (target.classList.contains('bookmarkBoard-background')) {
      this.fireEvent('onRequestCloseBookmark');
      return true;
    }
    return false;
  }

  onClickRemoveBookmarkBtn(e, target) {
    if (target.classList.contains('bookmark-removeItemBtn')) {
      bookmarkProvider.remove(e.target.dataset.id);
      this.populateBookmarks();
      return true;
    }
    return false;
  }

  onBookmarkStock(e, target) {
    let submit = false;
    switch (e.type) {
      case 'click':
      case 'touchend':
        submit = target.classList.contains('save') && target.classList.contains('icon');
        break;

      case 'keypress':
        submit = e.key.toLowerCase() === 'enter';
        break;
    }
    if (!submit) return false;

    const values = this.state.bookmarkInputString.trim().split(' ');
    if (values.length > 1) {
      const bookmarkPayload = {};
      if (Number.isNaN(parseInt(values[1], 10))) {
        bookmarkPayload.id = values[0];
        bookmarkPayload.name = values[1];
      } else {
        bookmarkPayload.id = values[1];
        bookmarkPayload.name = values[0];
      }
      bookmarkProvider.put(bookmarkPayload.id, bookmarkPayload);
      this.populateBookmarks();
    }
    return true;
  }

  populateBookmarks() {
    bookmarkProvider.toArray().then(bookmarks => this.setState({ bookmarks }));
  }

  renderItemSaved(stock) {
    const onEvent = stock.id === this.state.stockIdToLookup ? this.onEvent : null;
    return (
      <List.Item className="bookmark-item" key={stock.id}>
        <Icon className="bookmark-removeItemBtn" name="trash alternate" data-id={stock.id} onClick={this.onClick} onTouchEnd={this.onClick} />
        <List.Header className="bookmark-itemHeader">
          <span className="bookmark-stockTitle">{stock.name} {stock.id}</span>
          <Icon className="bookmark-lookupBtn" name="search" data-id={stock.id} onClick={this.onClick} onTouchEnd={this.onClick} />
        </List.Header>
        <StockLinks className="bookmark-itemLinks" stock={stock} onEvent={onEvent} />
      </List.Item>);
  }

  renderItemsSaved(stocks) {
    return <List className="bookmark-list" size="large">{ stocks.map(s => this.renderItemSaved(s)) }</List>;
  }

  render() {
    const className = [ 'bookmarkBoard' ];
    if (this.props.show) className.push('bookmarkBoard--show');

    return (
      <section className={className.join(' ')} onClick={this.onClick} onKeyPress={this.onClick}>
        <div className="bookmarkBoard-background" />
        <div className="bookmarkBoard-content">
          <section className="bookmarkBoard-inputSection">
            <Input
              className="bookmarkBoard-input"
              size="small"
              icon="save"
              placeholder="2330 台積電"
              value={this.state.bookmarkInputString}
              onChange={this.onInputChange}
            />
          </section>
          { this.renderItemsSaved(this.state.bookmarks) }
        </div>
      </section>
    );
  }

  componentDidUpdate(prevProps) {
    if (prevProps.show && !this.props.show) {
      this.setState({ bookmarkInputString: '' });
    }
  }
}

BookmarkBoard.propTypes = {
  show: PropTypes.bool,
};

export default BookmarkBoard;
