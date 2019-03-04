import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'semantic-ui-react';

import '@/css/MainBar.css';

class MainBar extends Component {
  constructor(props) {
    super(props);

    this.state = { stockId: '' };

    this.onInputChange = (e) => {
      this.setState({ stockId: e.target.value });
    };

    this.onClick = (e) => {
      let submit = false;
      switch (e.type) {
        case 'click':
          submit = e.target.classList.contains('search') && e.target.classList.contains('icon');
          break;

        case 'keypress':
          submit = e.key.toLowerCase() === 'enter';
          break;
      }
      const { stockId } = this.state;
      if (submit && stockId) {
        this.props.onRequestStockValue({ stockId });
      }
    };
  }

  render() {
    return (
      <div className="mainBar" onClick={this.onClick} onKeyPress={this.onClick}>
        <Input
          className="mainBar-input"
          icon="search"
          size="small"
          placeholder="Search..."
          onChange={this.onInputChange}
        />
      </div>
    );
  }
}

MainBar.propTypes = {
  onRequestStockValue: PropTypes.func.isRequired,
};

export default MainBar;
