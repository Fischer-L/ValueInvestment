import { Component } from 'react';

class ClickableComponent extends Component {
  constructor(props) {
    super(props);

    this._handlers = [];

    this.onClick = e => {
      if (this._handlers.length === 0) return;

      if (e.type === 'touchend') this._isTouchHandled = true;

      if (e.type === 'click' && this._isTouchHandled) {
        e.stopPropagation();
        return;
      }

      e.persist();
      let { target } = e;
      while (target) {
        for (const handler of this._handlers) { // eslint-disable-line no-restricted-syntax
          if (handler(e, target)) {
            e.preventDefault();
            e.stopPropagation();
            return;
          }
        }
        if (this._stopTraversingDOM(e, target)) {
          target = null;
        }
        target = target && target.parentElement;
      }
    };
  }

  onClickDo(callback) {
    return e => {
      if (e.type === 'touchend') this._isTouchHandled = true;
      if (e.type === 'click' && this._isTouchHandled) {
        e.stopPropagation();
        return;
      }
      callback(e);
    };
  }

  fireCallback(name, payload) {
    if (typeof this.props[name] === 'function') {
      this.props[name](payload);
    }
  }

  _stopTraversingDOM(e, target) { // eslint-disable-line no-unused-vars
    return false;
  }

  regisOnClick(...handlers) {
    this._handlers.push(...handlers.filter(h => typeof h === 'function'));
  }
}

export default ClickableComponent;
