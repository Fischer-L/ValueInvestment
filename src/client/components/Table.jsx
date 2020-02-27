import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import { round } from '@/utils/index';
import show from '@/utils/showDisplay';

import '@/css/Table.scss';

function renderHeader(headerSubText = {}) {
  const { low, mid, top } = headerSubText;
  return (
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell />
        <Table.HeaderCell>Low<p className="table-subText" style={show(low)}>({ low })</p></Table.HeaderCell>
        <Table.HeaderCell></Table.HeaderCell>
        <Table.HeaderCell>Mid<p className="table-subText" style={show(mid)}>({ mid })</p></Table.HeaderCell>
        <Table.HeaderCell></Table.HeaderCell>
        <Table.HeaderCell>Top<p className="table-subText" style={show(top)}>({ top })</p></Table.HeaderCell>
      </Table.Row>
    </Table.Header>
  );
}

function Row({ title, cells }) {
  const tableCells = cells.map(([ content, subText ], i) => {
    const key = i + content + (subText || '');
    return (
      <Table.Cell key={key} className={i % 2 === 1 ? 'table-subText' : ''}>
        { content || '' }
        <p className="table-subText" style={show(subText)}>({ subText })</p>
      </Table.Cell>
    );
  });
  return (
    <Table.Row>
      <Table.Cell>{ title[0] }<p className="table-subText" style={show(title[1])}>({ title[1] })</p></Table.Cell>
      { tableCells }
    </Table.Row>
  );
}
Row.propTypes = {
  title: PropTypes.arrayOf(PropTypes.string).isRequired,
  cells: PropTypes.array.isRequired,
};

class TableByYears extends Component {
  render() {
    const [ [top5yrsPrice, top5yrsFactor], [mid5yrsPrice, mid5yrsFactor], [low5yrsPrice, low5yrsFactor] ] = this.props.prices5yrs;
    const [ [top3yrsPrice, top3yrsFactor], [mid3yrsPrice, mid3yrsFactor], [low3yrsPrice, low3yrsFactor] ] = this.props.prices3yrs;
    return (
      <Table unstackable selectable color={this.props.color} className="table">
        { renderHeader() }
        <Table.Body>
          { Row({
            title: [ '5 Years' ],
            cells: [
              [ low5yrsPrice, low5yrsFactor ],
              [ round((low5yrsPrice + mid5yrsPrice) / 2), round((low5yrsFactor + mid5yrsFactor) / 2) ],
              [ mid5yrsPrice, mid5yrsFactor ],
              [ round((mid5yrsPrice + top5yrsPrice) / 2), round((mid5yrsFactor + top5yrsFactor) / 2) ],
              [ top5yrsPrice, top5yrsFactor ],
            ],
          }) }
          { Row({
            title: [ '3 Years' ],
            cells: [
              [ low3yrsPrice, low3yrsFactor ],
              [ round((low3yrsPrice + mid3yrsPrice) / 2), round((low3yrsFactor + mid3yrsFactor) / 2) ],
              [ mid3yrsPrice, mid3yrsFactor ],
              [ round((mid3yrsPrice + top3yrsPrice) / 2), round((mid3yrsFactor + top3yrsFactor) / 2) ],
              [ top3yrsPrice, top3yrsFactor ],
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

  renderRow(title, data) {
    const [ dividend, topPrice, midPrice, lowPrice ] = data;
    return Row({
      title: [ title, dividend ],
      cells: [
        [ lowPrice ],
        [ round((lowPrice + midPrice) / 2) ],
        [ midPrice ],
        [ round((midPrice + topPrice) / 2) ],
        [ topPrice ],
      ],
    });
  }

  render() {
    const { current, average, estimated, smoothEstimated } = this.props.pricesByDividends;
    return (
      <Table unstackable selectable color={this.props.color} className="table">
        { renderHeader({ low: '6.25%', mid: '4%', top: '2.5%' }) }
        <Table.Body>
          { this.renderRow('Est.', estimated) }
          { this.renderRow('Smooth Est.', smoothEstimated) }
          { this.renderRow('Current', current) }
          { this.renderRow('Average', average) }
        </Table.Body>
      </Table>
    );
  }
}

TableByDividends.propTypes = {
  color: PropTypes.string,
  pricesByDividends: PropTypes.shape({
    current: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
    average: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
    estimated: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
    smoothEstimated: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  }).isRequired,
};

export { TableByYears, TableByDividends };
