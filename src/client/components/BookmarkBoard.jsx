import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '@/css/BookmarkBoard.scss';

class BookmarkBoard extends Component {
  render() {
    const className = [ 'bookmarkBoard' ];
    if (this.props.show) className.push('bookmarkBoard--show');

    return (
      <section className={className.join(' ')}>
        <div className="bookmarkBoard-content">
          bookmarkBoard
        </div>
      </section>
    );
  }
}

BookmarkBoard.propTypes = {
  show: PropTypes.bool,
};

export default BookmarkBoard;
