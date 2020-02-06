import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon, Header, Modal, Input } from 'semantic-ui-react';

import showDisplay from '@/utils/showDisplay';
import ClickableComponent from '@/components/subcomponents/ClickableComponent';

const show = showDisplay;

const ACTION = {
  OK: 'OK',
  CANCEL: 'CANCEL',
};

class Prompt extends ClickableComponent {
  constructor(props) {
    super(props);

    this.state = {
      open: true,
      input: '',
    };

    this.onInputChange = e => this.setState({ input: e.target.value });

    this.onAction = this.onClickDo(e => {
      let action = e.target.dataset.action;
      if (e.type === 'keypress' && e.key.toLowerCase() === 'enter') {
        action = ACTION.OK;
      }
      switch (action) {
        case ACTION.OK:
        case ACTION.CANCEL:
          const payload = { action };
          if (this.props.hasInput) payload.input = this.state.input;
          this.fireCallback('onClose', payload);
          this.setState({ open: false });
          break;
      }
    });
  }

  Input(hasInput) {
    if (hasInput) {
      return <Input onChange={this.onInputChange} onKeyPress={this.onAction} style={{ width: '100%' }} />;
    }
    return null;
  }

  render() {
    const { open } = this.state;
    const { msg, title, hasInput } = this.props;
    return (
      <Modal open={open} onClick={this.onAction}>
        <Modal.Content>
          <Header style={show(title)} content={title} />
          <p style={show(msg)}>{ msg }</p>
          { this.Input(hasInput) }
        </Modal.Content>
        <Modal.Actions>
          <Button color="grey" data-action={ACTION.CANCEL}><Icon name="remove" /> Cancel</Button>
          <Button color="green" data-action={ACTION.OK}><Icon name="checkmark" /> OK</Button>
        </Modal.Actions>
      </Modal>);
  }
}


Prompt.propTypes = {
  msg: PropTypes.string,
  title: PropTypes.string,
  hasInput: PropTypes.bool,
  onClose: PropTypes.func,
};

export default Prompt;

export { ACTION };
