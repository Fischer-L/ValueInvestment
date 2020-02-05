import React from 'react';
import PropTypes from 'prop-types';
import { List, Icon, Input, Button } from 'semantic-ui-react';

import getURL from '@/utils/getURL';
import openLink from '@/utils/openLink';
import bookmarkProvider, { BOOKMARK_TYPE } from '@/api/bookmarkProvider';
import StockLinksTW from '@/components/StockLinksTW';
import ClickableComponent from '@/components/subcomponents/ClickableComponent';

import '@/css/BookmarkBoard.scss';

class BookmarkBoard extends ClickableComponent {
  constructor(props) {
    super(props);

    this.state = {
      pttUsers: [],
      bookmarks: [],
      stockIdToLookup: '',
      bookmarkInputString: '',
    };

    this.onInputChange = (e) => {
      this.setState({ bookmarkInputString: e.target.value });
    };

    this.onAskForURLs = ({ urls }) => {
      this.setState({ stockIdToLookup: '' });
      openLink(...urls);
    };

    this.onRequestLookupStock = this.onClickDo(e => {
      const stockId = e.target.dataset.id;
      this.setState({ stockIdToLookup: stockId });
      this.fireCallback('onRequestLookupStock', { stockId });
    });

    this.onClickBakground = this.onClickDo(() => this.fireCallback('onRequestCloseBookmark'));

    this.onClickRemoveBookmarkBtn = this.onClickDo(e => {
      bookmarkProvider.remove(BOOKMARK_TYPE.STOCK, e.target.dataset.id)
        .then(() => this.populateBookmarks());
    });

    this.onClickPttUsersLinks = this.onClickDo(() => {
      const urls = this.state.pttUsers.reduce((_urls, { id }) => {
        if (id === '標的') {
          _urls.push(getURL('pttpost', { q: id }));
        } else {
          _urls.push(getURL('ptt', { q: id }), getURL('pttuser', { q: id }));
        }
        return _urls;
      }, []);
      openLink(...urls);
    });

    this.onClickPttUser = this.onClickDo(e => {
      if (e.target.dataset.links) {
        openLink(...e.target.dataset.links.split(','));
        return;
      }
      if (e.target.classList.contains('bookmark-removePttUserBtn')) {
        bookmarkProvider.remove(BOOKMARK_TYPE.PTT_USER, e.target.dataset.id).then(() => this.populatePttUsers());
      }
    });

    this.onBookmark = this.onClickDo(e => {
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
      if (!submit) return;

      const values = this.state.bookmarkInputString.trim().split(' ');
      if (values.length > 1) {
        const bookmarkPayload = {};
        if (Number.isNaN(parseInt(values[1], 10))) {
          bookmarkPayload.id = values[0];
          bookmarkPayload.name = values[1];
        } else {
          bookmarkPayload.id = values[1];
          bookmarkPayload.name = values[0];
        }
        bookmarkProvider.put(BOOKMARK_TYPE.STOCK, bookmarkPayload.id, bookmarkPayload)
          .then(() => this.populateBookmarks());
      } else if (values.length === 1) {
        const id = values[0];
        bookmarkProvider.put(BOOKMARK_TYPE.PTT_USER, id, { id }).then(() => this.populatePttUsers());
      }
    });

    this.populatePttUsers = () => {
      bookmarkProvider.toArray(BOOKMARK_TYPE.PTT_USER).then(pttUsers => {
        this.setState({ pttUsers: [ { id: '標的' }, ...pttUsers ] });
      });
    };

    this.populateBookmarks = () => {
      bookmarkProvider.toArray(BOOKMARK_TYPE.STOCK).then(bookmarks => this.setState({ bookmarks }));
    };

    this.populatePttUsers();
    this.populateBookmarks();
  }

  renderItemsSaved(stocks) {
    const items = stocks.map(stock => {
      const onAskForURLs = stock.id === this.state.stockIdToLookup ? this.onAskForURLs : null;
      return (
        <List.Item className="bookmark-item" key={stock.id}>
          <Icon className="bookmark-removeItemBtn" name="close" data-id={stock.id} onClick={this.onClickRemoveBookmarkBtn} onTouchEnd={this.onClickRemoveBookmarkBtn} />
          <List.Header className="bookmark-itemHeader">
            <span className="bookmark-stockTitle">{stock.name} {stock.id}</span>
            <Icon className="bookmark-lookupBtn" name="search" data-id={stock.id} onClick={this.onRequestLookupStock} onTouchEnd={this.onRequestLookupStock} />
          </List.Header>
          <StockLinksTW className="bookmark-itemLinks" stock={stock} onAskForURLs={onAskForURLs} />
        </List.Item>);
    });
    return <List className="bookmark-list" size="large">{ items }</List>;
  }

  renderPttUsers(pttUsers) {
    if (pttUsers.length === 0) return null;

    const items = pttUsers.map(({ id }) => {
      const links = [];
      if (id === '標的') {
        links.push(getURL('pttpost', { q: id }));
      } else {
        links.push(getURL('ptt', { q: id }), getURL('pttuser', { q: id }));
      }
      return (
        <li className="bookmark-pttUser" key={id} onClick={this.onClickPttUser} onTouchEnd={this.onClickPttUser}>
          <a data-links={links.join(',')} href="javascript:void(0)">{id}</a>
          <Icon className="bookmark-removePttUserBtn" name="close" data-id={id} />
        </li>);
    });
    return (
      <div className="bookmark-pttUsers-holder">
        <Button className="pttUsersLinks-openBtn" icon="globe" circular onClick={this.onClickPttUsersLinks} onTouchEnd={this.onClickPttUsersLinks} />
        <ul className="bookmark-pttUsers">
          { items }
        </ul>
      </div>);
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
              placeholder="2330 台積電"
              value={this.state.bookmarkInputString}
              onChange={this.onInputChange}
            />
            { this.renderPttUsers(this.state.pttUsers) }
          </section>
          { this.renderItemsSaved(this.state.bookmarks) }
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
  onRequestLookupStock: PropTypes.func,
  onRequestCloseBookmark: PropTypes.func,
};

export default BookmarkBoard;
