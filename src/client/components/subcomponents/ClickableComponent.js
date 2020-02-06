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

  hasCallback(name) {
    return typeof this.props[name] === 'function';
  }

  fireCallback(name, payload) {
    if (this.hasCallback(name)) this.props[name](payload);
  }
}

export default ClickableComponent;
