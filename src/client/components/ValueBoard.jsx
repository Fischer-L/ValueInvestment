import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Header, List } from 'semantic-ui-react';
import { TableByYears, TableByDividends } from '@/components/Table';

import '@/css/ValueBoard.css';

class ValueBoard extends Component {
  constructor(props) {
    super(props);

    this.calcPricesByPE = () => {
      const { eps, pe } = this.props.stockData;
      return ['in5yrs', 'in3yrs'].reduce((pricesByPE, period) => {
        const { top, mid, low } = pe[period];
        pricesByPE[period] = [
          [eps * top, top],
          [eps * mid, mid],
          [eps * low, low],
        ];
        return pricesByPE;
      }, {});
    };

    this.calcPricesByPB = () => {
      const { netValue, pb } = this.props.stockData;
      return ['in5yrs', 'in3yrs'].reduce((pricesByPB, period) => {
        const { top, mid, low } = pb[period];
        pricesByPB[period] = [
          [netValue * top, top],
          [netValue * mid, mid],
          [netValue * low, low],
        ];
        return pricesByPB;
      }, {});
    };

    this.calcPricesByDividends = () => {
      const { dividends } = this.props.stockData;
      const currDividend = dividends[0];
      const avgDividend = dividends.reduce((sum, v) => sum + v, 0) / dividends.length;
      return {
        current: [ currDividend, currDividend * 25, currDividend * 16 ],
        average: [ avgDividend, avgDividend * 25, avgDividend * 16 ],
      };
    };
  }

  render() {
    const { name, eps, price, netValue } = this.props.stockData;
    const pricesByPE = this.calcPricesByPE();
    const pricesByPB = this.calcPricesByPB();
    const pricesByDividends = this.calcPricesByDividends();
    return (
      <section className="valueBoard">
        <Header as="h2" dividing>{name} {this.props.stockId}</Header>
        <List horizontal size="big">
          <List.Item>
            <List.Header>Current price</List.Header>{price}
          </List.Item>
          <List.Item>
            <List.Header>Current EPS</List.Header>{eps}
          </List.Item>
          <List.Item>
            <List.Header>Current net value</List.Header>{netValue}
          </List.Item>
        </List>
        <Header as="h3">Values By PE</Header>
        <TableByYears prices5yrs={pricesByPE.in5yrs} prices3yrs={pricesByPE.in3yrs} color="blue" />
        <Header as="h3">Values By PB</Header>
        <TableByYears prices5yrs={pricesByPB.in5yrs} prices3yrs={pricesByPB.in3yrs} color="teal" />
        <Header as="h3">Values By Dividend</Header>
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
