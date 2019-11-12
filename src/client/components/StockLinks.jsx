import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List } from 'semantic-ui-react';

class StockLinks extends Component {
  render() {
    const { stock, className } = this.props;
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
      <List className={className || ''} bulleted horizontal size="large">
        <List.Item as="a" target="_blank" href={urls[0]} onClick={this.TMP_onClick}>技術</List.Item>
        <List.Item as="a" target="_blank" href={urls[1]}>籌碼</List.Item>
        <List.Item as="a" target="_blank" href={urls[2]}>News</List.Item>
        <List.Item as="a" target="_blank" href={urls[3]}>24hrs News</List.Item>
        <List.Item as="a" target="_blank" href={urls[4]}>討論</List.Item>
        <List.Item as="a" target="_blank" href={urls[5]}>Ptt</List.Item>
      </List>
    );
  }
}

StockLinks.propTypes = {
  stock: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
  className: PropTypes.string,
};

export default StockLinks;
