import React from 'react';
import PropTypes from 'prop-types';
import { List, Button } from 'semantic-ui-react';

import getURL, { SITE } from '@/utils/getURL';
import openURL from '@/utils/openURL';
import MARKET_TYPE from '@/utils/marketType';
import ClickableComponent from '@/components/subcomponents/ClickableComponent';
import '@/css/StockLinks.scss';

class StockLinks extends ClickableComponent {
  constructor(props) {
    super(props);
    this.openLinks = this.onClickDo(() => openURL(...this._links.map(link => link.url)));
  }

  createLinks({ stock, market }) {
    switch (market) {
      case MARKET_TYPE.TW:
        return [
          { title: '技術', url: getURL(SITE.technical, null, { stockId: stock.id }) },
          { title: '法人', url: getURL(SITE.chips, { stockId: stock.id }) },
          { title: '資券', url: getURL(SITE.margin, { stockId: stock.id }) },
          { title: '大戶', url: getURL(SITE.big_holder, { stockId: stock.id }) },
          { title: '資訊', url: getURL(SITE.info, null, { stockId: stock.id }) },
          { title: 'News', url: getURL(SITE.news_24hrs, { q: stock.name }) },
          { title: '討論', url: getURL(SITE.forum, null, { stockId: stock.id }) },
          { title: 'Ptt', url: getURL(SITE.ptt, { q: stock.name }) },
        ];

      case MARKET_TYPE.US:
        return [
          { title: '技術', url: getURL(SITE.technical, null, { stockId: stock.id }) },
          { title: '財務', url: getURL(SITE.us_finance, { stockId: stock.id }, { stockId: stock.id }) },
          { title: '資訊', url: getURL(SITE.info, null, { stockId: stock.id }) },
          { title: 'News', url: getURL(SITE.news_24hrs, { q: stock.name }) },
          { title: 'Ptt', url: getURL(SITE.ptt, { q: stock.name }) },
        ];
    }
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

StockLinks.propTypes = {
  stock: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
  className: PropTypes.string,
  whenAskForURLs: PropTypes.func,
  market: PropTypes.string.isRequired,
};

export default StockLinks;
