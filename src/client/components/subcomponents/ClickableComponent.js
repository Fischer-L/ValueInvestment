import { Component } from 'react';

class ClickableComponent extends Component {

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
}

export default ClickableComponent;
