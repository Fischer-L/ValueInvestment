import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List, Icon, Input } from 'semantic-ui-react';

import bookmarkProvider from '@/api/bookmarkProvider';

import '@/css/BookmarkBoard.scss';

class BookmarkBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bookmarks: [],
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

      const handlers = [ 'onBookmarkStock', 'onClickRemoveBookmarkBtn' ];
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
    const nameEncoded = encodeURIComponent(stock.name);
    const urls = [
      `https://www.wantgoo.com/stock/astock/techchart?stockno=${stock.id}`,
      `https://goodinfo.tw/StockInfo/ShowBuySaleChart.asp?CHT_CAT=DATE&STOCK_ID=${stock.id}`,
      `https://www.google.com/search?tbm=nws&q=${stock.id}+${nameEncoded}`,
      `https://www.google.com/search?tbm=nws&tbs=qdr:d&q=${stock.id}+${nameEncoded}`,
      `https://www.cmoney.tw/follow/channel/stock-${stock.id}`,
      `https://www.google.com/search?tbs=qdr:w&q=${nameEncoded}+site:www.ptt.cc/bbs/Stock`,
    ];
    return (
      <List.Item className="bookmark-item" key={stock.id}>
        <Icon className="bookmark-removeItemBtn" name="trash alternate" data-id={stock.id} onClick={this.onClick} onTouchEnd={this.onClick} />
        <List.Header className="bookmark-itemHeader">{stock.name} {stock.id}</List.Header>
        <List className="bookmark-itemLinks" bulleted horizontal size="large">
          <List.Item as="a" target="_blank" href={urls[0]}>技術</List.Item>
          <List.Item as="a" target="_blank" href={urls[1]}>籌碼</List.Item>
          <List.Item as="a" target="_blank" href={urls[2]}>News</List.Item>
          <List.Item as="a" target="_blank" href={urls[3]}>24hrs News</List.Item>
          <List.Item as="a" target="_blank" href={urls[4]}>討論</List.Item>
          <List.Item as="a" target="_blank" href={urls[5]}>Ptt</List.Item>
        </List>
      </List.Item>);
  }

  renderItemsSaved(stocks) {
    return <List size="large">{ stocks.map(s => this.renderItemSaved(s)) }</List>;
  }

  render() {
    const className = [ 'bookmarkBoard' ];
    if (this.props.show) className.push('bookmarkBoard--show');

    return (
      <section className={className.join(' ')}>
        <div className="bookmarkBoard-background" />
        <div className="bookmarkBoard-content">
          <section className="bookmarkBoard-inputSection" onClick={this.onClick} onKeyPress={this.onClick}>
            <Input
              className="bookmarkBoard-input"
              size="small"
              icon="save"
              placeholder="2330 台積電"
              onChange={this.onInputChange}
            />
          </section>
          { this.renderItemsSaved(this.state.bookmarks) }
        </div>
      </section>
    );
  }
}

BookmarkBoard.propTypes = {
  show: PropTypes.bool,
};

export default BookmarkBoard;
