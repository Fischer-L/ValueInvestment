import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import { round } from '@/utils/index';

import '@/css/Table.css';

const subTextClass = subText => `table-subText ${subText ? '' : 'app-none'}`;

function renderHeader(headerSubText = {}) {
  const { low, mid, top } = headerSubText;
  return (
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell />
        <Table.HeaderCell>Low<p className={subTextClass(low)}>({ low })</p></Table.HeaderCell>
        <Table.HeaderCell></Table.HeaderCell>
        <Table.HeaderCell>Mid<p className={subTextClass(mid)}>({ mid })</p></Table.HeaderCell>
        <Table.HeaderCell></Table.HeaderCell>
        <Table.HeaderCell>Top<p className={subTextClass(top)}>({ top })</p></Table.HeaderCell>
      </Table.Row>
    </Table.Header>
  );
}

function renderRow({ title, cells }) {
  const tableCells = cells.map(([ content, subText ], i) => {
    const key = i + content + (subText || '');
    return <Table.Cell key={key}>{ content || '' }<p className={subTextClass(subText)}>{ subText }</p></Table.Cell>;
  });
  return (
    <Table.Row>
      <Table.Cell>{ title[0] }<p className={subTextClass(title[1])}>{ title[1] }</p></Table.Cell>
      { tableCells }
    </Table.Row>
  );
}
renderRow.propTypes = {
  title: PropTypes.arrayOf(PropTypes.string).isRequired,
  cells: PropTypes.array.isRequired,
};

class TableByYears extends Component {
  render() {
    const [ [top5Price, top5Eps], [mid5Price, mid5Eps], [low5Price, low5Eps] ] = this.props.prices5yrs;
    const [ [top3Price, top3Eps], [mid3Price, mid3Eps], [low3Price, low3Eps] ] = this.props.prices3yrs;
    return (
      <Table unstackable selectable color={this.props.color} className="table">
        { renderHeader() }
        <Table.Body>
          { renderRow({
            title: [ '5 Years' ],
            cells: [
              [ low5Price, `(${low5Eps})` ],
              [ '', round((low5Price + mid5Price) / 2) ],
              [ mid5Price, `(${mid5Eps})` ],
              [ '', round((mid5Price + top5Price) / 2) ],
              [ top5Price, `(${top5Eps})` ],
            ],
          }) }
          { renderRow({
            title: [ '3 Years' ],
            cells: [
              [ low3Price, `(${low3Eps})` ],
              [ '', round((low3Price + mid3Price) / 2) ],
              [ mid3Price, `(${mid3Eps})` ],
              [ '', round((mid3Price + top3Price) / 2) ],
              [ top3Price, `(${top3Eps})` ],
            ],
          }) }
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
    const [ currDividend, topCurrPrice, midCurrPrice, lowCurrPrice ] = this.props.priceByCurrDividend;
    const [ AvgDividend, topAvgPrice, midAvgPrice, lowAvgPrice ] = this.props.priceByAvgDividend;
    return (
      <Table unstackable selectable color={this.props.color} className="table">
        { renderHeader({ low: '6.25%', mid: '4%', top: '2.5%' }) }
        <Table.Body>
          { renderRow({
            title: [ 'Current Dividends', `(${currDividend})` ],
            cells: [
              [ lowCurrPrice ],
              [ '', round((lowCurrPrice + midCurrPrice) / 2) ],
              [ midCurrPrice ],
              [ '', round((midCurrPrice + topCurrPrice) / 2) ],
              [ topCurrPrice ],
            ],
          }) }
          { renderRow({
            title: [ 'Average Dividends', `(${AvgDividend})` ],
            cells: [
              [ lowAvgPrice ],
              [ '', round((lowAvgPrice + midAvgPrice) / 2) ],
              [ midAvgPrice ],
              [ '', round((midAvgPrice + topAvgPrice) / 2) ],
              [ topAvgPrice ],
            ],
          }) }
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
