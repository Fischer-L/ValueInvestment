import { Component } from 'react';

class ClickableComponent extends Component {

  onClickDo(callback) {
    return (e, payload) => {
      if (e) {
        if (e.type === 'touchend') {
          this._isTouchHandled = true;
        }
        if (e.type === 'click' && this._isTouchHandled) {
          e.stopPropagation();
          return;
        }
      }
      callback(e, payload);
    };
  }

  fireCallback(name, payload) {
    if (typeof this.props[name] === 'function') {
      this.props[name](payload);
    }
  }
}

export default ClickableComponent;
