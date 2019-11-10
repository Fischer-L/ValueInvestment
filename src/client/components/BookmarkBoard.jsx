import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List } from 'semantic-ui-react';

import '@/css/BookmarkBoard.scss';

class BookmarkBoard extends Component {
  renderItemSaved(stock) {
    const nameEncoded = encodeURIComponent(stock.name);
    const urls = [
      `https://www.wantgoo.com/stock/astock/techchart?stockno=${stock.id}`,
      `https://goodinfo.tw/StockInfo/ShowBuySaleChart.asp?CHT_CAT=DATE&STOCK_ID=${stock.id}`,
      `https://www.google.com/search?tbm=nws&q=${stock.id}+${nameEncoded}`,
      `https://www.google.com/search?tbm=nws&tbs=qdr:d&q=${stock.id}+${nameEncoded}`,
      `https://www.cmoney.tw/follow/channel/stock-${stock.id}`,
    ];
    return (
      <List.Item className="bookmark-item" key={stock.id}>
        <List.Header className="bookmark-itemHeader">{stock.name} {stock.id}</List.Header>
        <List className="bookmark-itemLinks" bulleted horizontal size="large">
          <List.Item as="a" target="_blank" href={urls[0]}>技術</List.Item>
          <List.Item as="a" target="_blank" href={urls[1]}>籌碼</List.Item>
          <List.Item as="a" target="_blank" href={urls[2]}>News</List.Item>
          <List.Item as="a" target="_blank" href={urls[3]}>24hrs News</List.Item>
          <List.Item as="a" target="_blank" href={urls[4]}>討論</List.Item>
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
        <div className="bookmarkBoard-content">
          { this.renderItemsSaved([
            { id: 2317, name: '鴻海' },
            { id: 2474, name: '可成' },
            { id: 3227, name: '原相' },
            { id: 2352, name: '佳世達' },
            { id: 2492, name: '華新科' },
          ]) }
        </div>
      </section>
    );
  }
}

BookmarkBoard.propTypes = {
  show: PropTypes.bool,
};

export default BookmarkBoard;
