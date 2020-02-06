import React from 'react';
import PropTypes from 'prop-types';

import bookmarkProvider, { BOOKMARK_TYPE } from '@/api/bookmarkProvider';
import BookmarkBoard, { StocksBookmark, PttUsersBookmark } from '@/components/BookmarkBoard';
import ClickableComponent from '@/components/subcomponents/ClickableComponent';

class BookmarkBoardTW extends ClickableComponent {
  constructor(props) {
    super(props);

    this.state = {
      pttUsers: [],
      bookmarks: [],
    };

    this.whenRemovePttUser = ({ id }) => {
      bookmarkProvider.remove(BOOKMARK_TYPE.PTT_USER, id).then(() => this.populatePttUsers());
    };

    this.whenRemoveStock = ({ id }) => {
      bookmarkProvider.remove(BOOKMARK_TYPE.STOCK, id).then(() => this.populateBookmarks());
    };

    this.whenBookmark = ({ values }) => {
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
    };

    this.populatePttUsers = () => {
      bookmarkProvider.toArray(BOOKMARK_TYPE.PTT_USER).then(pttUsers => this.setState({ pttUsers }));
    };

    this.populateBookmarks = () => {
      bookmarkProvider.toArray(BOOKMARK_TYPE.STOCK).then(bookmarks => this.setState({ bookmarks }));
    };

    this.populatePttUsers();
    this.populateBookmarks();
  }

  render() {
    const { pttUsers, bookmarks } = this.state;

    const { show, whenCloseBookmark } = this.props;
    const bookmarkBoardProps = { show, whenCloseBookmark, whenBookmark: this.whenBookmark };

    return (
      <BookmarkBoard {...bookmarkBoardProps}>
        <PttUsersBookmark pttUsers={pttUsers} whenRemovePttUser={this.whenRemovePttUser} />
        <StocksBookmark stocks={bookmarks} whenLookupStock={this.props.whenLookupStock} whenRemoveStock={this.whenRemoveStock} />
      </BookmarkBoard>
    );
  }
}
BookmarkBoardTW.propTypes = {
  show: PropTypes.bool,
  whenLookupStock: PropTypes.func,
  whenCloseBookmark: PropTypes.func,
};

export default BookmarkBoardTW;
