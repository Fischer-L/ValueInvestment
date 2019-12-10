import React from 'react';
import PropTypes from 'prop-types';
import { List, Button } from 'semantic-ui-react';

import getLink from '@/utils/getLink';
import openLink from '@/utils/openLink';
import ClickableComponent from '@/components/subcomponents/ClickableComponent';
import '@/css/StockLinks.scss';

class StockLinks extends ClickableComponent {
  constructor(props) {
    super(props);
    this.regisOnClick(() => {
      openLink(...this._urls);
      return true;
    });
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
        <Button className="stockLinks-openBtn" icon="globe" circular onClick={this.onClick} onTouchEnd={this.onClick} />
      </List>
    );
  }

  componentDidMount() {
    this.fireCallback('onAskForURLs', { stock: this.props.stock, urls: this._urls });
  }

  componentDidUpdate() {
    this.fireCallback('onAskForURLs', { stock: this.props.stock, urls: this._urls });
  }
}

StockLinks.propTypes = {
  stock: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
  className: PropTypes.string,
  autoOpenLinks: PropTypes.bool,
  onAskForURLs: PropTypes.func,
};

export default StockLinks;
