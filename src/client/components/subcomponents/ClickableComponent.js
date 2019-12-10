// import { Component } from 'react'; TODO: Will need after removing EventDispatcher
import EventDispatcher from '@/components/subcomponents/EventDispatcher';

class ClickableComponent extends EventDispatcher {
  constructor(props) {
    super(props);

    this._handlers = [];

    this.onClick = (e) => {
      if (this._handlers.length === 0) return;

      if (e.type === 'touchend') this._isTouchHandled = true;

      if (e.type === 'click' && this._isTouchHandled) {
        e.preventDefault();
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

  _stopTraversingDOM(e, target) { // eslint-disable-line no-unused-vars
    return false;
  }

  regisOnClick(...handlers) {
    this._handlers.push(...handlers.filter(h => typeof h === 'function'));
  }
}

export default ClickableComponent;
