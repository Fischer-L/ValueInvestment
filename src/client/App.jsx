import React, { Component } from 'react';

import MainBar from '@/components/MainBar';
import '@/css/App.css';
import 'semantic-ui-css/semantic.min.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.onRequestStockValue = ({ stockId }) => {
      console.log('TMP> stockId =', stockId);
    };
  }

  render() {
    return (
      <div className="App">
        <MainBar onRequestStockValue={this.onRequestStockValue} />
      </div>
    );
  }
}

export default App;
