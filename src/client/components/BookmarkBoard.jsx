import React from 'react';
import PropTypes from 'prop-types';
import { List, Icon, Input, Button } from 'semantic-ui-react';

import getLink from '@/utils/getLink';
import bookmarkProvider, { BOOKMARK_TYPE } from '@/api/bookmarkProvider';
import StockLinks from '@/components/StockLinks';
import EventDispatcher from '@/components/subcomponents/EventDispatcher';

import '@/css/BookmarkBoard.scss';

class BookmarkBoard extends EventDispatcher {
  constructor(props) {
    super(props);

    this.state = {
      pttUsers: [],
      bookmarks: [],
      stockIdToLookup: '',
      bookmarkInputString: '',
    };
    this.populatePttUsers();
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

      const handlers = [ 'onClickBakground', 'onBookmark', 'onRequestLookupStock', 'onClickRemoveBookmarkBtn', 'onClickPttUsersLinks', 'onClickRemovePttUserBtn' ];
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
      bookmarkProvider.remove(BOOKMARK_TYPE.STOCK, e.target.dataset.id)
        .then(() => this.populateBookmarks());
      return true;
    }
    return false;
  }

  onClickPttUsersLinks(e, target) {
    if (target.classList.contains('pttUsersLinks-openBtn')) {
      requestAnimationFrame(() => {
        this.state.pttUsers.forEach(({ id }) => {
          window.open(getLink('ptt', { q: id }), '_blank');
        });
      });
      return true;
    }
    return false;
  }

  onClickRemovePttUserBtn(e, target) {
    if (target.classList.contains('bookmark-removePttUserBtn')) {
      bookmarkProvider.remove(BOOKMARK_TYPE.PTT_USER, e.target.dataset.id)
        .then(() => this.populatePttUsers());
      return true;
    }
    return false;
  }

  onBookmark(e, target) {
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
      bookmarkProvider.put(BOOKMARK_TYPE.STOCK, bookmarkPayload.id, bookmarkPayload)
        .then(() => this.populateBookmarks());
    } else if (values.length === 1) {
      const id = values[0];
      bookmarkProvider.put(BOOKMARK_TYPE.PTT_USER, id, { id }).then(() => this.populatePttUsers());
    }
    return true;
  }

  populatePttUsers() {
    bookmarkProvider.toArray(BOOKMARK_TYPE.PTT_USER).then(pttUsers => this.setState({ pttUsers }));
  }

  populateBookmarks() {
    bookmarkProvider.toArray(BOOKMARK_TYPE.STOCK).then(bookmarks => this.setState({ bookmarks }));
  }

  renderItemsSaved(stocks) {
    const items = stocks.map(stock => {
      const onEvent = stock.id === this.state.stockIdToLookup ? this.onEvent : null;
      return (
        <List.Item className="bookmark-item" key={stock.id}>
          <Icon className="bookmark-removeItemBtn" name="close" data-id={stock.id} onClick={this.onClick} onTouchEnd={this.onClick} />
          <List.Header className="bookmark-itemHeader">
            <span className="bookmark-stockTitle">{stock.name} {stock.id}</span>
            <Icon className="bookmark-lookupBtn" name="search" data-id={stock.id} onClick={this.onClick} onTouchEnd={this.onClick} />
          </List.Header>
          <StockLinks className="bookmark-itemLinks" stock={stock} onEvent={onEvent} />
        </List.Item>);
    });
    return <List className="bookmark-list" size="large">{ items }</List>;
  }

  renderPttUsers(pttUsers) {
    if (pttUsers.length === 0) return null;

    const items = pttUsers.map(({ id }) => (
      <li className="bookmark-pttUser" key={id}>
        <a target="_blank" rel="noopener noreferrer" href={getLink('ptt', { q: id })}>{id}</a>
        <Icon className="bookmark-removePttUserBtn" name="close" data-id={id} onClick={this.onClick} />
      </li>
    ));
    return (
      <div className="bookmark-pttUsers-holder">
        <Button className="pttUsersLinks-openBtn" icon="globe" circular onClick={this.onClick} />
        <ul className="bookmark-pttUsers">
          { items }
        </ul>
      </div>);
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
            { this.renderPttUsers(this.state.pttUsers) }
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
