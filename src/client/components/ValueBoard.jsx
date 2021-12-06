import React from 'react';
import PropTypes from 'prop-types';
import { Header, Input, Icon } from 'semantic-ui-react';

import { apiClient, extensionClient, getStockProvider } from '@/api/index';
import bookmarkProvider, { BOOKMARK_TYPE } from '@/api/bookmarkProvider';
import { round } from '@/utils/round';
import MARKET_TYPE from '@/utils/marketType';
import Loading from '@/components/Loading';
import ErrorDuck from '@/components/ErrorDuck';
import StockLinks from '@/components/StockLinks';
import { TableByYears, TableByDividends } from '@/components/Table';
import ClickableComponent from '@/components/subcomponents/ClickableComponent';

import '@/css/ValueBoard.scss';

const stockProvider = getStockProvider({ apiClient, extensionClient, domParser: new DOMParser() });

const MS_EST_DEALY = 500;

const defaultState = () => ({
  stockId: null,
  stockName: null,
  stockData: null,
  forecastEPS: 0,
  forecastDividend: 0,

  error: null,
  loading: false,
});

class ValueBoard extends ClickableComponent {
  constructor(props) {
    super(props);

    this.state = defaultState();

    this._round = values => values.map((v) => {
      if (v instanceof Array) return this._round(v);
      return round(v);
    });

    this.onScheduleForecast = e => {
      if (this._timer) {
        clearTimeout(this._timer);
      }
      const { value, parentNode } = e.target;
      const isEPS = parentNode.classList.contains('valueBoard-input--eps');
      this._timer = setTimeout(() => {
        const v = Number(value);
        const k = isEPS ? 'forecastEPS' : 'forecastDividend';
        this.setState({ [k]: v > 0 ? v : 0 });
      }, MS_EST_DEALY);
    };

    this.onInputChange = this.onScheduleForecast;

    this.loadStockData = async force => {
      if (this.state.loading) {
        return;
      }

      let { stockId, market } = this.props;

      let noCache = false;
      if (stockId.startsWith('.')) {
        noCache = true;
        stockId = stockId.substr(1);
      }
      stockId = stockId.toUpperCase();

      if (stockId === this.state.stockId && !force) {
        return;
      }
      this.setState({ ...defaultState(), stockId });

      if (market !== MARKET_TYPE.TW) {
        return;
      }

      this.setState({ loading: true });
      try {
        // Because the speed of stockProvider is slow so we don't wait it and fetch the name first
        stockProvider.get(stockId, noCache).then(stockData => {
          if (stockData && stockData.id === stockId) this.setState({ stockData, stockName: stockData.name });
        });
        const name = await stockProvider.getName(stockId);
        this.setState({ stockName: name });
      } catch (error) {
        this.setState({ error });
      }
      this.setState({ loading: false });
    };

    this.calcPricesByPE = ({ stockData, forecastEPS }) => {
      const { eps, pe } = stockData;
      const currEPS = forecastEPS || eps;
      return ['in5yrs', 'in3yrs'].reduce((pricesByPE, period) => {
        const { top, mid, low } = pe[period];
        pricesByPE[period] = this._round([
          [ currEPS * top, top ],
          [ currEPS * mid, mid ],
          [ currEPS * low, low ],
        ]);
        return pricesByPE;
      }, {});
    };

    this.calcPricesByDividends = ({ stockData, forecastEPS, forecastDividend }) => {
      const { eps, cashDivs, cashPayoutRatio: { in5yrs: ratio } } = stockData;
      const currEPS = forecastEPS || eps;
      const currDividend = forecastDividend || cashDivs[0];
      const avgDividend = cashDivs.reduce((sum, v) => sum + v, 0) / cashDivs.length;
      const estDividend = currEPS * ratio.avg;
      const smoothEstDividend = currEPS * ratio.smoothAvg;
      return {
        current: this._round([ currDividend, currDividend * 40, currDividend * 25, currDividend * 16 ]),
        average: this._round([ avgDividend, avgDividend * 40, avgDividend * 25, avgDividend * 16 ]),
        estimated: this._round([ estDividend, estDividend * 40, estDividend * 25, estDividend * 16 ]),
        smoothEstimated: this._round([ smoothEstDividend, smoothEstDividend * 40, smoothEstDividend * 25, smoothEstDividend * 16 ]),
      };
    };

    this.calcPricesByPB = ({ stockData }) => {
      const { bookValue, pb } = stockData;
      if (!bookValue || !pb) {
        return null;
      }
      return ['in5yrs', 'in3yrs'].reduce((pricesByPB, period) => {
        const { top, mid, low } = pb[period];
        pricesByPB[period] = this._round([
          [bookValue * top, top],
          [bookValue * mid, mid],
          [bookValue * low, low],
        ]);
        return pricesByPB;
      }, {});
    };

    this.onBookmark = this.onClickDo(() => {
      const { stockId: id, stockName: name } = this.state;
      bookmarkProvider.put(BOOKMARK_TYPE.STOCKS, id, { id, name });
    });
  }

  renderPanel() {
    const { eps, price, cashDivs } = this.state.stockData;
    return (
      <table className="valueBoard-panel">
        <tbody>
          <tr>
            <th className="valueBoard-penalCell">Price</th>
            <th className="valueBoard-penalCell">EPS</th>
            <th className="valueBoard-penalCell">DIV</th>
            <th className="valueBoard-penalCell">Est. EPS</th>
            <th className="valueBoard-penalCell">Est. DIV</th>
          </tr>
          <tr>
            <td className="valueBoard-penalCell">
              { round(price) }
            </td>
            <td className="valueBoard-penalCell">
              { round(eps) }
            </td>
            <td className="valueBoard-penalCell">
              { round(cashDivs[0]) }
            </td>
            <td className="valueBoard-penalCell">
              <Input
                className="valueBoard-input valueBoard-input--eps"
                size="mini"
                onChange={this.onInputChange}
              />
            </td>
            <td className="valueBoard-penalCell">
              <Input
                className="valueBoard-input valueBoard-input--dividend"
                size="mini"
                onChange={this.onInputChange}
              />
            </td>
          </tr>
        </tbody>
      </table>
    );
  }

  renderStockData() {
    if (!this.state.stockData) {
      return null;
    }
    const pricesByPE = this.calcPricesByPE(this.state);
    const peElem = !pricesByPE ? null
      : (
        <section className="valueBoard-dataSection">
          <Header as="h3">Costs By PE</Header>
          <TableByYears prices5yrs={pricesByPE.in5yrs} prices3yrs={pricesByPE.in3yrs} color="blue" />
        </section>
      );

    const pricesByPB = this.calcPricesByPB(this.state);
    const pbElem = !pricesByPB ? null
      : (
        <section className="valueBoard-dataSection">
          <Header as="h3">Costs By PB</Header>
          <TableByYears prices5yrs={pricesByPB.in5yrs} prices3yrs={pricesByPB.in3yrs} color="teal" />
        </section>
      );

    const pricesByDividends = this.calcPricesByDividends(this.state);
    const dividendElem = !pricesByDividends ? null
      : (
        <section className="valueBoard-dataSection">
          <Header as="h3">Costs By Dividend</Header>
          <TableByDividends pricesByDividends={pricesByDividends} color="green" />
        </section>
      );

    return (
      <div>
        { this.renderPanel() }
        { peElem }
        { dividendElem }
        { pbElem }
      </div>
    );
  }

  renderStock() {
    let stockLinksElem = null;
    const { stockId, stockName } = this.state;
    if (stockId && stockName) {
      stockLinksElem = (
        <Header as="h2" dividing>
          <div className="valueBoard-stockTitle">
            {stockId} {stockName}
            <Icon className="valueBoard-bookmarkIcon" name="plus circle" size="small" onClick={this.onBookmark} onTouchEnd={this.onBookmark} />
          </div>
          <StockLinks className="valueBoard-stockLinks" stock={{ id: stockId, name: stockName }} market={MARKET_TYPE.TW} />
        </Header>
      );
    }
    return (
      <div>
        { stockLinksElem }
        { this.renderStockData() }
      </div>
    );
  }

  render() {
    let content = null;
    const { error, loading } = this.state;

    if (error) {
      content = ErrorDuck(error.toString());
    } else if (loading) {
      content = Loading();
    } else {
      content = this.renderStock();
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

  componentDidUpdate(prevProps) {
    this.loadStockData(prevProps.lookupTime !== this.props.lookupTime);
  }
}

ValueBoard.propTypes = {
  market: PropTypes.string.isRequired,
  stockId: PropTypes.string.isRequired,
  lookupTime: PropTypes.number.isRequired,
};

export default ValueBoard;
