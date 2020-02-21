import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Header, List } from 'semantic-ui-react';

import { apiClient, getStockProvider } from '@/api/index';
import { round } from '@/utils/index';
import MARKET_TYPE from '@/utils/marketType';
import Loading from '@/components/Loading';
import ErrorDuck from '@/components/ErrorDuck';
import { StockLinksTW } from '@/components/StockLinks';
import { TableByYears, TableByDividends } from '@/components/Table';

import '@/css/ValueBoard.scss';

const stockProvider = getStockProvider({ apiClient, domParser: new DOMParser() });

const defaultState = () => ({
  stockId: null,
  stockData: null,

  error: null,
  loading: false,
});

class ValueBoard extends Component {
  constructor(props) {
    super(props);

    this.state = defaultState();

    this._round = values => values.map((v) => {
      if (v instanceof Array) return this._round(v);
      return round(v);
    });

    this.loadStockData = async () => {
      let { stockId, market } = this.props;
      if (this.state.loading || stockId === this.state.stockId) {
        return;
      }

      let noCache = false;
      if (stockId.startsWith('-')) {
        noCache = true;
        stockId = stockId.substr(1);
      }
      stockId = stockId.toUpperCase();

      this.setState({ ...defaultState(), stockId });
      if (market !== MARKET_TYPE.TW) {
        return;
      }

      this.setState({ loading: true });
      try {
        const stockData = await stockProvider.get(stockId, noCache);
        if (stockId === stockData.id) {
          this.setState({ stockData });
        }
      } catch (error) {
        this.setState({ error });
      }
      this.setState({ loading: false });
    };

    this.calcPricesByPE = stockData => {
      const { eps, pe } = stockData;
      return ['in5yrs', 'in3yrs'].reduce((pricesByPE, period) => {
        const { top, mid, low } = pe[period];
        pricesByPE[period] = this._round([
          [eps * top, top],
          [eps * mid, mid],
          [eps * low, low],
        ]);
        return pricesByPE;
      }, {});
    };

    this.calcPricesByPB = stockData => {
      const { netValue, pb } = stockData;
      return ['in5yrs', 'in3yrs'].reduce((pricesByPB, period) => {
        const { top, mid, low } = pb[period];
        pricesByPB[period] = this._round([
          [netValue * top, top],
          [netValue * mid, mid],
          [netValue * low, low],
        ]);
        return pricesByPB;
      }, {});
    };

    this.calcPricesByDividends = stockData => {
      const { eps, dividends, dividendPolicy: { in5yrs: rate } } = stockData;
      const currDividend = dividends[0];
      const avgDividend = dividends.reduce((sum, v) => sum + v, 0) / dividends.length;
      const estDividend = eps * rate.avg;
      const smoothEstDividend = eps * rate.smoothAvg;
      return {
        current: this._round([ currDividend, currDividend * 40, currDividend * 25, currDividend * 16 ]),
        average: this._round([ avgDividend, avgDividend * 40, avgDividend * 25, avgDividend * 16 ]),
        estimated: this._round([ estDividend, estDividend * 40, estDividend * 25, estDividend * 16 ]),
        smoothEstimated: this._round([ smoothEstDividend, smoothEstDividend * 40, smoothEstDividend * 25, smoothEstDividend * 16 ]),
      };
    };
  }

  renderStockData(stockData) {
    const { id, name, eps, price, netValue } = stockData;
    const pricesByPE = this.calcPricesByPE(stockData);
    const pricesByPB = this.calcPricesByPB(stockData);
    const pricesByDividends = this.calcPricesByDividends(stockData);
    return (
      <div>
        <Header as="h2" dividing>
          <span className="valueBoard-stockTitle">{id} {name}</span>
          <StockLinksTW stock={{ id, name }} className="valueBoard-stockLinks" />
        </Header>
        <List horizontal size="big">
          <List.Item>
            <List.Header>Price</List.Header>{round(price)}
          </List.Item>
          <List.Item>
            <List.Header>EPS</List.Header>{round(eps)}
          </List.Item>
          <List.Item>
            <List.Header>Net value</List.Header>{round(netValue)}
          </List.Item>
        </List>
        <Header as="h3">Costs By PE</Header>
        <TableByYears prices5yrs={pricesByPE.in5yrs} prices3yrs={pricesByPE.in3yrs} color="blue" />
        <Header as="h3">Costs By Dividend</Header>
        <TableByDividends pricesByDividends={pricesByDividends} color="green" />
        <Header as="h3">Costs By PB</Header>
        <TableByYears prices5yrs={pricesByPB.in5yrs} prices3yrs={pricesByPB.in3yrs} color="teal" />
      </div>
    );
  }

  render() {
    let content = null;
    const { error, loading, stockData } = this.state;

    if (error) {
      content = ErrorDuck(error.toString());
    } else if (loading) {
      content = Loading();
    } else if (stockData) {
      content = this.renderStockData(stockData);
    }

    return (
      <section className="valueBoard">
        { content }
      </section>
    );
  }

  componentDidMount() {
    this.loadStockData();
  }

  componentDidUpdate() {
    this.loadStockData();
  }
}

ValueBoard.propTypes = {
  market: PropTypes.string.isRequired,
  stockId: PropTypes.string.isRequired,
};

export default ValueBoard;
