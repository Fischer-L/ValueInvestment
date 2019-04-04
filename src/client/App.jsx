import React, { Component } from 'react';
import axios from 'axios';

import StockProvider, { getFakeData } from '@/api/index';
import MainBar from '@/components/MainBar';
import ValueBoard from '@/components/ValueBoard';

import '@/css/App.css';
import 'semantic-ui-css/semantic.min.css';

import icoLoading from '@/assets/ico_loading.svg';

const stockProvider = new StockProvider({ axios, DOMParser });

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      stockId: getFakeData().id,
      stockData: getFakeData(),
    };

    this.onRequestStockValue = async ({ stockId }) => {
      this.setState({ stockId, stockData: null, error: null });
      try {
        const stockData = await stockProvider.get(stockId);
        if (stockId === stockData.id) {
          this.setState({ stockData });
        }
      } catch (e) {
        this.setState({ stockId: null, error: e.toString() });
      }
    };

    this.renderErrorComponent = msg => (
      <div className="appContent-error">
        <h3>Oops~something wrong. Please search again</h3>
        <p>{msg}</p>
      </div>
    );

    this.renderLoadingComponent = () => (
      <div className="appContent-loading">
        <img src={icoLoading} width="52px" alt="Loading..." />
      </div>
    );
  }

  render() {
    let appContent = null;
    const { stockId, stockData, error } = this.state;
    if (error) {
      appContent = this.renderErrorComponent(error);
    } else if (stockId && !stockData) {
      appContent = this.renderLoadingComponent();
    } else if (stockId && stockData) {
      appContent = (<ValueBoard stockId={stockId} stockData={stockData} />);
    }

    return (
      <div className="app">
        <MainBar onRequestStockValue={this.onRequestStockValue} />
        <section className="appContent">{appContent}</section>
      </div>
    );
  }
}

export default App;
