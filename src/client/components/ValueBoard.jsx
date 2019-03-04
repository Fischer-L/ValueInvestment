import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Header, List } from 'semantic-ui-react';
import { TableByYears, TableByDividends } from '@/components/Table';

import '@/css/ValueBoard.css';

class ValueBoard extends Component {
  constructor(props) {
    super(props);

    this.calcPricesByEPS = () => {
      const { price, eps } = this.props.stockData;
      return ['in5yrs', 'in3yrs'].reduce((pricesByEPS, period) => {
        const { top, mid, low } = eps[period];
        pricesByEPS[period] = [
          [price * top, top],
          [price * mid, mid],
          [price * low, low],
        ];
        return pricesByEPS;
      }, {});
    };

    this.calcPricesByPBS = () => {
      const { netValue, pbs } = this.props.stockData;
      return ['in5yrs', 'in3yrs'].reduce((pricesByPBS, period) => {
        const { top, mid, low } = pbs[period];
        pricesByPBS[period] = [
          [netValue * top, top],
          [netValue * mid, mid],
          [netValue * low, low],
        ];
        return pricesByPBS;
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
    const { price, netValue } = this.props.stockData;
    const pricesByEPS = this.calcPricesByEPS();
    const pricesByPBS = this.calcPricesByPBS();
    const pricesByDividends = this.calcPricesByDividends();
    return (
      <section className="valueBoard">
        <Header as="h2" dividing>{this.props.stockId}</Header>
        <List horizontal size="big">
          <List.Item>
            <List.Header>Current price</List.Header>{price}
          </List.Item>
          <List.Item>
            <List.Header>Current net value</List.Header>{netValue}
          </List.Item>
        </List>
        <Header as="h3">Values By EPS</Header>
        <TableByYears prices5yrs={pricesByEPS.in5yrs} prices3yrs={pricesByEPS.in3yrs} color="blue" />
        <Header as="h3">Values By PBS</Header>
        <TableByYears prices5yrs={pricesByPBS.in5yrs} prices3yrs={pricesByPBS.in3yrs} color="teal" />
        <Header as="h3">Values By Dividends</Header>
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
