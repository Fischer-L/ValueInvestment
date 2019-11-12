import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List, Button } from 'semantic-ui-react';

import '@/css/StockLinks.scss';

class StockLinks extends Component {
  constructor(props) {
    super(props);

    this.onClick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      const urls = this.createURLs(this.props);
      for (let i = urls.length - 1; i >= 0; --i) {
        window.open(urls[i], '_blank');
      }
      return false;
    };
  }

  createURLs({ stock }) {
    const nameEncoded = encodeURIComponent(stock.name);
    return [
      `https://www.wantgoo.com/stock/astock/techchart?stockno=${stock.id}`,
      `https://goodinfo.tw/StockInfo/ShowBuySaleChart.asp?CHT_CAT=DATE&STOCK_ID=${stock.id}`,
      `https://www.google.com/search?tbm=nws&q=${nameEncoded}`,
      `https://www.google.com/search?tbm=nws&tbs=qdr:d&q=${nameEncoded}`,
      `https://www.cmoney.tw/follow/channel/stock-${stock.id}`,
      `https://www.google.com/search?tbs=qdr:w&q=${nameEncoded}+site:www.ptt.cc/bbs/Stock`,
    ];
  }

  render() {
    const urls = this.createURLs(this.props);
    const classes = [ 'stockLinks', this.props.className || '' ];
    return (
      <List className={classes.join(' ')} bulleted horizontal size="large">
        <List.Item as="a" target="_blank" href={urls[0]}>技術</List.Item>
        <List.Item as="a" target="_blank" href={urls[1]}>籌碼</List.Item>
        <List.Item as="a" target="_blank" href={urls[2]}>News</List.Item>
        <List.Item as="a" target="_blank" href={urls[3]}>24hrs News</List.Item>
        <List.Item as="a" target="_blank" href={urls[4]}>討論</List.Item>
        <List.Item as="a" target="_blank" href={urls[5]}>Ptt</List.Item>
        <Button className="stockLinks-openBtn" icon="globe" circular onClick={this.onClick} />
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
