import React from 'react';
import PropTypes from 'prop-types';
import { List, Icon, Input, Button } from 'semantic-ui-react';

import getURL from '@/utils/getURL';
import openURL from '@/utils/openURL';
import StockLinks from '@/components/StockLinks';
import ClickableComponent from '@/components/subcomponents/ClickableComponent';

import '@/css/BookmarkBoard.scss';

export class PttUsersBookmark extends ClickableComponent {
  constructor(props) {
    super(props);

    this.urlsOf = id => {
      const urls = [];
      if (id === '標的') {
        urls.push(getURL('pttpost', { q: id }));
      } else {
        urls.push(getURL('ptt', { q: id }), getURL('pttuser', { q: id }));
      }
      return urls;
    };

    this.onClickPttUser = this.onClickDo(e => {
      if (e.target.dataset.links) {
        openURL(...e.target.dataset.links.split(','));
        return;
      }
      if (e.target.classList.contains('bookmark-removePttUserBtn')) {
        this.fireCallback('whenRemovePttUser', { id: e.target.dataset.id });
      }
    });

    this.onClickPttUsersLinks = this.onClickDo(() => {
      const urls = this.getPttUsers().reduce((_urls, { id }) => _urls.concat(...this.urlsOf(id)), []);
      openURL(...urls);
    });

    this.getPttUsers = () => {
      const { pttUsers } = this.props;
      return (pttUsers && pttUsers.length) ? [ { id: '標的' }, ...pttUsers ] : [];
    };
  }

  render() {
    const items = this.getPttUsers().map(({ id }) => (
      <li className="bookmark-pttUser" key={id} onClick={this.onClickPttUser} onTouchEnd={this.onClickPttUser}>
        <a data-links={this.urlsOf(id).join(',')} href="javascript:void(0)">{id}</a>
        <Icon className="bookmark-removePttUserBtn" name="close" data-id={id} />
      </li>));
    if (items.length === 0) {
      return null;
    }
    return (
      <div className="bookmark-pttUsers-holder">
        <Button className="pttUsersLinks-openBtn" icon="globe" circular onClick={this.onClickPttUsersLinks} onTouchEnd={this.onClickPttUsersLinks} />
        <ul className="bookmark-pttUsers">
          { items }
        </ul>
      </div>);
  }
}
PttUsersBookmark.propTypes = {
  pttUsers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })),
  whenRemovePttUser: PropTypes.func,
};

export class StocksBookmark extends ClickableComponent {
  constructor(props) {
    super(props);

    this.state = {
      stockIdToLookup: '',
    };

    this.whenAskForURLs = ({ urls }) => {
      this.setState({ stockIdToLookup: '' });
      openURL(...urls);
    };

    this.onLookupStock = this.onClickDo(e => {
      const stockId = e.target.dataset.id;
      this.setState({ stockIdToLookup: stockId });
      this.fireCallback('whenLookUpStock', { stockId });
    });

    this.onRemoveStock = this.onClickDo(e => {
      this.fireCallback('whenRemoveStock', { id: e.target.dataset.id });
    });
  }

  render() {
    const items = this.props.stocks.map(stock => {
      const { market } = this.props;
      const whenAskForURLs = stock.id === this.state.stockIdToLookup ? this.whenAskForURLs : null;
      return (
        <List.Item className="bookmark-item" key={stock.id}>
          <Icon className="bookmark-removeItemBtn" name="close" data-id={stock.id} onClick={this.onRemoveStock} onTouchEnd={this.onRemoveStock} />
          <List.Header className="bookmark-itemHeader">
            <span className="bookmark-stockTitle">{stock.id} {stock.name}</span>
            <Icon className="bookmark-lookupBtn" name="search" data-id={stock.id} onClick={this.onLookupStock} onTouchEnd={this.onLookupStock} />
          </List.Header>
          <StockLinks className="bookmark-itemLinks" stock={stock} market={market} whenAskForURLs={whenAskForURLs} />
        </List.Item>);
    });
    return <List className="bookmark-list" size="large">{ items }</List>;
  }
}
StocksBookmark.propTypes = {
  stocks: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })),
  market: PropTypes.string.isRequired,
  whenLookUpStock: PropTypes.func,
  whenRemoveStock: PropTypes.func,
};

class BookmarkBoard extends ClickableComponent {
  constructor(props) {
    super(props);

    this.state = {
      bookmarkInputString: '',
    };

    this.onInputChange = (e) => {
      this.setState({ bookmarkInputString: e.target.value });
    };

    this.onClickBakground = this.onClickDo(() => this.fireCallback('whenCloseBookmark'));

    this.onBookmark = this.onClickDo(e => {
      if (!this.state.bookmarkInputString) {
        return;
      }

      let submit = false;
      switch (e.type) {
        case 'click':
        case 'touchend':
          submit = e.target.classList.contains('save') && e.target.classList.contains('icon');
          break;

        case 'keypress':
          submit = e.key.toLowerCase() === 'enter';
          break;
      }
      if (submit) {
        this.fireCallback('whenBookmark', this.decodeInput(this.state.bookmarkInputString));
      }
    });

    this.decodeInput = input => {
      const [ id, ...names ] = input.trim().split(' ');
      return {
        id,
        name: names.join(' '),
      };
    };
  }

  render() {
    const className = [ 'bookmarkBoard' ];
    if (this.props.show) className.push('bookmarkBoard--show');

    return (
      <section className={className.join(' ')}>
        <div className="bookmarkBoard-background" onClick={this.onClickBakground} onTouchEnd={this.onClickBakground} />
        <div className="bookmarkBoard-content">
          <section className="bookmarkBoard-inputSection" onClick={this.onBookmark} onTouchEnd={this.onBookmark} onKeyPress={this.onBookmark}>
            <Input
              className="bookmarkBoard-input"
              size="small"
              icon="save"
              placeholder={this.props.placeholder}
              value={this.state.bookmarkInputString}
              onChange={this.onInputChange}
            />
          </section>
          { this.props.children }
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
  placeholder: PropTypes.string,
  whenBookmark: PropTypes.func,
  whenCloseBookmark: PropTypes.func,
};

export default BookmarkBoard;
