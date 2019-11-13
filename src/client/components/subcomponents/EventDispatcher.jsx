import { Component } from 'react';
import PropTypes from 'prop-types';

class EventDispatcher extends Component {
  constructor(props) {
    super(props);

    this.onEvent = (name, payload) => {
      if (typeof this[name] === 'function') {
        this[name](payload);
      }
    };

    this.fireEvent = (name, payload) => {
      if (typeof this.props.onEvent === 'function') {
        this.props.onEvent(name, payload);
      }
    };
  }
}

EventDispatcher.propTypes = {
  onEvent: PropTypes.func,
};

export default EventDispatcher;
