import React from 'react';
import PropTypes from 'prop-types';

import getURL from '@/utils/getURL';
import StockLinks from '@/components/StockLinks';
import ClickableComponent from '@/components/subcomponents/ClickableComponent';

class StockLinksUS extends ClickableComponent {

  createLinks({ stock }) {
    return [
      { title: '技術', url: getURL('gw', { stockId: stock.id }) },
      { title: 'finance', url: getURL('ya_us', { stockId: stock.id }, { stockId: stock.id }) },
      { title: 'News', url: getURL('news', { q: stock.name }) },
      { title: '24hrs News', url: getURL('24hrs_news', { q: stock.name }) },
      { title: 'Ptt', url: getURL('ptt', { q: stock.name }) },
    ];
  }

  render() {
    this._links = this.createLinks(this.props);
    return <StockLinks className={this.props.className} links={this._links} />;
  }

  componentDidMount() {
    this.fireCallback('whenAskForURLs', { stock: this.props.stock, urls: this._links.map(link => link.url) });
  }

  componentDidUpdate() {
    this.fireCallback('whenAskForURLs', { stock: this.props.stock, urls: this._links.map(link => link.url) });
  }
}

StockLinksUS.propTypes = {
  stock: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
  className: PropTypes.string,
  whenAskForURLs: PropTypes.func,
};

export default StockLinksUS;
