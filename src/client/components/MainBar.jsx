import React, { Component } from 'react';
import { Input, Button } from 'semantic-ui-react';

import '@/css/MainBar.css';

class MainBar extends Component {
  render() {
    return (
      <div id="mainBar">
        <Input icon="search" size="large" placeholder="Search..." />
        <Button primary>Primary</Button>
        <Button secondary>Secondary</Button>
      </div>
    );
  }
}

export default MainBar;
