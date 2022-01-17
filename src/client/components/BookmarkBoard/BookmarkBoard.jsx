import React from 'react';
import PropTypes from 'prop-types';
import { List, Icon, Input, Button } from 'semantic-ui-react';

import getURL, { SITE } from '@/utils/getURL';
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
        urls.push(getURL(SITE.pttpost, { q: id }));
      } else {
        urls.push(getURL(SITE.ptt, { q: id }), getURL(SITE.pttuser, { q: id }));
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

    this.whenQuery = ({ id }) => {
      this.setState({ stockIdToLookup: id });
      this.fireCallback('whenLookUpStock', { stockId: id });
    };

    this.whenRemove = ({ id }) => this.fireCallback('whenRemoveStock', { stockId: id });
  }

  render() {
    const items = this.props.stocks.map(stock => {
      const title = stock.id + ' ' + stock.name;
      const whenAskForURLs = stock.id === this.state.stockIdToLookup ? this.whenAskForURLs : null;
      return (
        <BookmarkItem key={stock.id} id={stock.id} title={title} whenQuery={this.whenQuery} whenRemove={this.whenRemove}>
          <StockLinks className="bookmark-itemLinks" stock={stock} market={this.props.market} whenAskForURLs={whenAskForURLs} />
        </BookmarkItem>
      );
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
  whenLookUpStock: PropTypes.func.isRequired,
  whenRemoveStock: PropTypes.func.isRequired,
};

export class BookmarkItem extends ClickableComponent {
  constructor(props) {
    super(props);
    this.onQuery = this.onClickDo(() => this.fireCallback('whenQuery', { id: this.props.id }));
    this.onRemove = this.onClickDo(() => this.fireCallback('whenRemove', { id: this.props.id }));
  }

  render() {
    return (
      <List.Item className="bookmark-item">
        <Icon className="bookmark-removeItemBtn" name="close" onClick={this.onRemove} onTouchEnd={this.onRemove} />
        <List.Header className="bookmark-itemHeader">
          <span className="bookmark-stockTitle">{ this.props.title }</span>
          <Icon className="bookmark-lookupBtn" name="search" onClick={this.onQuery} onTouchEnd={this.onQuery} />
        </List.Header>
        { this.props.children }
      </List.Item>
    );
  }
}
BookmarkItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  whenQuery: PropTypes.func.isRequired,
  whenRemove: PropTypes.func.isRequired,
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
        this.fireCallback('whenBookmark', this.state.bookmarkInputString);
      }
    });
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
