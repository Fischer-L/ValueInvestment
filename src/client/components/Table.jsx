import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';

import '@/css/Table.css';

class TableByYears extends Component {
  render() {
    const [ [top5Price, top5Eps], [mid5Price, mid5Eps], [low5Price, low5Eps] ] = this.props.prices5yrs;
    const [ [top3Price, top3Eps], [mid3Price, mid3Eps], [low3Price, low3Eps] ] = this.props.prices3yrs;
    return (
      <Table unstackable selectable color={this.props.color} className="table">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell>Low</Table.HeaderCell>
            <Table.HeaderCell>Mid</Table.HeaderCell>
            <Table.HeaderCell>Top</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>5 Years</Table.Cell>
            <Table.Cell>{ low5Price }<p className="table-subText">({ low5Eps })</p></Table.Cell>
            <Table.Cell>{ mid5Price }<p className="table-subText">({ mid5Eps })</p></Table.Cell>
            <Table.Cell>{ top5Price }<p className="table-subText">({ top5Eps })</p></Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>3 Years</Table.Cell>
            <Table.Cell>{ low3Price }<p className="table-subText">({ low3Eps })</p></Table.Cell>
            <Table.Cell>{ mid3Price }<p className="table-subText">({ mid3Eps })</p></Table.Cell>
            <Table.Cell>{ top3Price }<p className="table-subText">({ top3Eps })</p></Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
  }
}

const arrayOfPriceEps = PropTypes.arrayOf(PropTypes.number).isRequired;

TableByYears.propTypes = {
  color: PropTypes.string,
  prices5yrs: PropTypes.arrayOf(arrayOfPriceEps).isRequired,
  prices3yrs: PropTypes.arrayOf(arrayOfPriceEps).isRequired,
};

class TableByDividends extends Component {
  render() {
    const [ currDividend, topCurrPrice, lowCurrPrice ] = this.props.priceByCurrDividend;
    const [ AvgDividend, topAvgPrice, lowAvgPrice ] = this.props.priceByAvgDividend;
    return (
      <Table unstackable selectable color={this.props.color} className="table">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell>Low<p className="table-subText">(6.25%)</p></Table.HeaderCell>
            <Table.HeaderCell>Top<p className="table-subText">(4%)</p></Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>Current Dividends<p className="table-subText">({ currDividend })</p></Table.Cell>
            <Table.Cell>{ lowCurrPrice }</Table.Cell>
            <Table.Cell>{ topCurrPrice }</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Average Dividends<p className="table-subText">({ AvgDividend })</p></Table.Cell>
            <Table.Cell>{ lowAvgPrice }</Table.Cell>
            <Table.Cell>{ topAvgPrice }</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
  }
}

TableByDividends.propTypes = {
  color: PropTypes.string,
  priceByAvgDividend: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  priceByCurrDividend: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
};

export { TableByYears, TableByDividends };
