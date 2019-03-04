import React, { Component } from 'react';

import stockProvider, { getFakeData } from '@/api/index';
import MainBar from '@/components/MainBar';
import ValueBoard from '@/components/ValueBoard';

import '@/css/App.css';
import 'semantic-ui-css/semantic.min.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stockId: getFakeData().id,
      stockData: getFakeData(),
    };

    this.onRequestStockValue = async ({ stockId }) => {
      const stockData = await stockProvider.get(stockId);
      this.setState({ stockId, stockData });
    };
  }

  render() {
    return (
      <div className="app">
        <MainBar onRequestStockValue={this.onRequestStockValue} />
        <section className="appConent">
          <ValueBoard stockId={this.state.stockId} stockData={this.state.stockData} />
        </section>
      </div>
    );
  }
}

export default App;
