import { Component } from 'react';
import PropTypes from 'prop-types';

class EventDispatcher extends Component {
  fireEvent(e, name, payload) {
    e.preventDefault();
    e.stopPropagation();
    if (typeof this.props.onEvent === 'function') {
      this.props.onEvent(name, payload);
    }
  }
}

EventDispatcher.propTypes = {
  onEvent: PropTypes.func,
};

export default EventDispatcher;
