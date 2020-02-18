import React from 'react';
import PropTypes from 'prop-types';
import { List, Button } from 'semantic-ui-react';

import getURL from '@/utils/getURL';
import openURL from '@/utils/openURL';
import ClickableComponent from '@/components/subcomponents/ClickableComponent';
import '@/css/StockLinks.scss';

class StockLinksBase extends ClickableComponent {
  constructor(props) {
    super(props);
    this.openLinks = this.onClickDo(() => openURL(...this._links.map(link => link.url)));
  }

  createLinks({ stock }) { // eslint-disable-line no-unused-vars
    throw new Error('Should implement createLinks for StockLinks');
  }

  render() {
    this._links = this.createLinks(this.props);
    const classes = [ 'stockLinks', this.props.className || '' ];
    return (
      <List className={classes.join(' ')} bulleted horizontal size="large">
        { this._links.map(({ url, title }) => <List.Item as="a" target="_blank" rel="noopener noreferrer" href={url} key={url}>{title}</List.Item>) }
        <Button className="stockLinks-openBtn" icon="globe" circular onClick={this.openLinks} onTouchEnd={this.openLinks} />
      </List>
    );
  }

  componentDidMount() {
    this.fireCallback('whenAskForURLs', { stock: this.props.stock, urls: this._links.map(link => link.url) });
  }

  componentDidUpdate() {
    this.fireCallback('whenAskForURLs', { stock: this.props.stock, urls: this._links.map(link => link.url) });
  }
}

StockLinksBase.propTypes = {
  stock: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
  className: PropTypes.string,
  whenAskForURLs: PropTypes.func,
};

class StockLinksTW extends StockLinksBase {
  createLinks({ stock }) {
    return [
      { title: '技術', url: getURL('gw', { stockId: stock.id }) },
      { title: '籌碼', url: getURL('goodinfo', { stockId: stock.id }) },
      { title: 'News', url: getURL('news', { q: stock.name }) },
      { title: '24hrs News', url: getURL('24hrs_news', { q: stock.name }) },
      { title: '討論', url: getURL('cmy', null, { stockId: stock.id }) },
      { title: 'Ptt', url: getURL('ptt', { q: stock.name }) },
    ];
  }
}

class StockLinksUS extends StockLinksBase {
  createLinks({ stock }) {
    return [
      { title: '技術', url: getURL('gw', { stockId: stock.id }) },
      { title: 'finance', url: getURL('ya_us', { stockId: stock.id }, { stockId: stock.id }) },
      { title: 'News', url: getURL('news', { q: stock.name }) },
      { title: '24hrs News', url: getURL('24hrs_news', { q: stock.name }) },
      { title: 'Ptt', url: getURL('ptt', { q: stock.name }) },
    ];
  }
}

export { StockLinksTW, StockLinksUS };
