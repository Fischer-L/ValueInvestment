import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Header, List } from 'semantic-ui-react';
import { round } from '@/utils/index';
import { TableByYears, TableByDividends } from '@/components/Table';
import StockLinksTW from '@/components/StockLinksTW';

import '@/css/ValueBoard.scss';

class ValueBoard extends Component {
  constructor(props) {
    super(props);

    this._round = values => values.map((v) => {
      if (v instanceof Array) return this._round(v);
      return round(v);
    });

    this.calcPricesByPE = () => {
      const { eps, pe } = this.props.stockData;
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

    this.calcPricesByPB = () => {
      const { netValue, pb } = this.props.stockData;
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

    this.calcPricesByDividends = () => {
      const { dividends } = this.props.stockData;
      const currDividend = dividends[0];
      const avgDividend = dividends.reduce((sum, v) => sum + v, 0) / dividends.length;
      return {
        current: this._round([ currDividend, currDividend * 40, currDividend * 25, currDividend * 16 ]),
        average: this._round([ avgDividend, avgDividend * 40, avgDividend * 25, avgDividend * 16 ]),
      };
    };
  }

  render() {
    const { id, name, eps, price, netValue } = this.props.stockData;
    const pricesByPE = this.calcPricesByPE();
    const pricesByPB = this.calcPricesByPB();
    const pricesByDividends = this.calcPricesByDividends();
    return (
      <section className="valueBoard">
        <Header as="h2" dividing>
          <span className="valueBoard-stockTitle">{name} {this.props.stockId}</span>
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
        <Header as="h3">Costs By PB</Header>
        <TableByYears prices5yrs={pricesByPB.in5yrs} prices3yrs={pricesByPB.in3yrs} color="teal" />
        <Header as="h3">Costs By Dividend</Header>
        <TableByDividends priceByCurrDividend={pricesByDividends.current} priceByAvgDividend={pricesByDividends.average} color="green" />
      </section>
    );
  }
}

ValueBoard.propTypes = {
  stockId: PropTypes.string.isRequired,
  stockData: PropTypes.object.isRequired,
};

export default ValueBoard;
