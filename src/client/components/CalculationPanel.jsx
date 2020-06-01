import React from 'react';
import { Icon, Button, Input, Divider } from 'semantic-ui-react';

import ClickableComponent from '@/components/subcomponents/ClickableComponent';

import '@/css/CalculationPanel.scss';

// function calcProfitRiskValues({ profitPrice, buyPrice, riskPrice, profitRiskRatio, reward }) {
//   // TMP TODO
// }

class CalculationPanel extends ClickableComponent {
  constructor(props) {
    super(props);

    this.state = {
      open: false,

      // TMP: TODO Profit & risk
      // profitPrice: 0,
      // buyPrice: 0,
      // riskPrice: 0,
      // profitRiskRatio: 0,
      // reward: 0,

      // EPS
      epsQ1: 0,
      growthQ1: 1,
      epsQ2: 0,
      growthQ2: 1,
      epsQ3: 0,
      growthQ3: 1,
      epsQ4: 0,
      growthQ4: 1,
      estEPS: 0,
    };

    this.normalizeValues = (...keys) => keys.map(key => {
      let value = parseFloat(this.state[key]);

      switch (key) {
        case 'epsQ1':
        case 'epsQ2':
        case 'epsQ3':
        case 'epsQ4':
          break;

        case 'profitPrice':
        case 'buyPrice':
        case 'riskPrice':
        case 'profitRiskRatio':
        case 'reward':
          value = Number.isNaN(value) ? 0 : Math.max(0, value);
          break;

        case 'growthQ1':
        case 'growthQ2':
        case 'growthQ3':
        case 'growthQ4':
          value = (value === '' || Number.isNaN(value)) ? 1 : Math.max(0, value);
          break;
      }
      return value;
    });

    this.toggleOpen = this.onClickDo(() => this.setState(state => ({ open: !state.open })));

    this.calcProfitRisk = this.onClickDo(() => {}); // TMP TODO

    this.calcEPS = this.onClickDo(() => {
      const estEPS = [ 1, 2, 3, 4 ].reduce((eps, quarter) => {
        const [ quarterEPS, quarterGrowth ] = this.normalizeValues(`epsQ${quarter}`, `growthQ${quarter}`);
        return eps + quarterEPS * quarterGrowth;
      }, 0);
      this.setState({ estEPS });
    });
  }

  renderInput(label, key, className) {
    return (
      <label className={`calculationPanel-inputHolder ${className}`} key={key}>
        <h5 className="calculationPanel-title">{ label }</h5>
        <Input className="calculationPanel-input" size="mini" onChange={e => this.setState({ [key]: e.target.value })} />
      </label>
    );
  }

  renderProfitRiskBlock() {
    if (1) return null; // TMP TODO
    const inputs = [
      [ '獲利價', 'profitPrice' ], [ '買進價', 'buyPrice' ], [ '轉利價', 'riskPrice' ], [ '風報', 'profitRiskRatio' ], [ '報酬', 'reward' ],
    ];
    return (
      <div className="calculationPanel-block">
        { inputs.map(([ label, key ]) => this.renderInput(label, key)) }
        <Button size="small" onClick={this.calcProfitRisk}>Go</Button>
      </div>
    );
  }

  renderEpsBlock() {
    const inputs = [
      [ 'Q1', 'epsQ1' ], [ 'Growth', 'growthQ1' ], [ 'Q2', 'epsQ2' ], [ 'Growth', 'growthQ2' ],
      [ 'Q3', 'epsQ3' ], [ 'Growth', 'growthQ3' ], [ 'Q4', 'epsQ4' ], [ 'Growth', 'growthQ4' ],
    ];
    const inputElms = inputs.map(([ label, key ], idx) => {
      let className = 'epsInput';
      if (idx % 2 === 1) className += ' title--small';
      return this.renderInput(label, key, className);
    });
    return (
      <div className="calculationPanel-block">
        { inputElms }
        <Button size="small" onClick={this.calcEPS}>{ this.state.estEPS }</Button>
      </div>
    );
  }

  renderPanel() {
    return (
      <section className="calculationPanel">
        <Icon className="calculationPanel-closeBtn" onClick={this.toggleOpen} name="close" />
        { this.renderEpsBlock() }
        <Divider />
        { this.renderProfitRiskBlock() }
      </section>
    );
  }

  renderEntryButton() {
    return <Button className="calculationPanel-entryBtn" onClick={this.toggleOpen} icon="calculator" color="orange" size="large" circular inverted />;
  }

  render() {
    return this.state.open ? this.renderPanel() : this.renderEntryButton();
  }
}

export default CalculationPanel;
