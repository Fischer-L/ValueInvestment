import React from 'react';
import PropTypes from 'prop-types';
import { List, Button } from 'semantic-ui-react';

import getLink from '@/utils/getLink';
import EventDispatcher from '@/components/subcomponents/EventDispatcher';
import '@/css/StockLinks.scss';

class StockLinks extends EventDispatcher {
  constructor(props) {
    super(props);

    this.onClick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      for (let i = this._urls.length - 1; i >= 0; --i) {
        window.open(this._urls[i], '_blank');
      }
      return false;
    };
  }

  createURLs({ stock }) {
    return [
      getLink('gw', { stockId: stock.id }),
      getLink('goodinfo', { stockId: stock.id }),
      getLink('news', { q: stock.name }),
      getLink('24hrs_news', { q: stock.name }),
      getLink('cmy', null, { stockId: stock.id }),
      getLink('ptt', { q: stock.name }),
    ];
  }

  render() {
    this._urls = this.createURLs(this.props);
    const classes = [ 'stockLinks', this.props.className || '' ];
    return (
      <List className={classes.join(' ')} bulleted horizontal size="large">
        <List.Item as="a" target="_blank" rel="noopener noreferrer" href={this._urls[0]}>技術</List.Item>
        <List.Item as="a" target="_blank" rel="noopener noreferrer" href={this._urls[1]}>籌碼</List.Item>
        <List.Item as="a" target="_blank" rel="noopener noreferrer" href={this._urls[2]}>News</List.Item>
        <List.Item as="a" target="_blank" rel="noopener noreferrer" href={this._urls[3]}>24hrs News</List.Item>
        <List.Item as="a" target="_blank" rel="noopener noreferrer" href={this._urls[4]}>討論</List.Item>
        <List.Item as="a" target="_blank" rel="noopener noreferrer" href={this._urls[5]}>Ptt</List.Item>
        <Button className="stockLinks-openBtn" icon="globe" circular onClick={this.onClick} />
      </List>
    );
  }

  componentDidMount() {
    this.fireEvent('onAskForURLs', { stock: this.props.stock, urls: this._urls });
  }

  componentDidUpdate() {
    this.fireEvent('onAskForURLs', { stock: this.props.stock, urls: this._urls });
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
