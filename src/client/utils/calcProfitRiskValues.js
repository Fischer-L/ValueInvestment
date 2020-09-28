import { roundObject } from '@/utils/round';

function calcProfitRiskRatio(profitPrice, executionPrice, riskPrice) {
  return (profitPrice - executionPrice) / (executionPrice - riskPrice);
}

function calcLongRiskPriceByRatio(profitPrice, executionPrice, profitRiskRatio) {
  return ((profitRiskRatio + 1) * executionPrice - profitPrice) / profitRiskRatio;
}

export function calcLongProfitRiskValues({ profitPrice, executionPrice, riskPrice, profitRiskRatio, reward, lock }) {
  let values = null;

  if (lock.profitPrice && lock.executionPrice && lock.riskPrice) {
    values = {
      profitPrice,
      executionPrice,
      riskPrice,
      profitRiskRatio: calcProfitRiskRatio(profitPrice, executionPrice, riskPrice),
      reward: (profitPrice / executionPrice) - 1,
    };
  }

  if (lock.profitPrice && lock.executionPrice && lock.profitRiskRatio) {
    values = {
      profitPrice,
      executionPrice,
      profitRiskRatio,
      riskPrice: calcLongRiskPriceByRatio(profitPrice, executionPrice, profitRiskRatio),
      reward: (profitPrice / executionPrice) - 1,
    };
  }

  if (lock.profitPrice && lock.riskPrice && lock.profitRiskRatio) {
    const buy = (profitPrice + profitRiskRatio * riskPrice) / (profitRiskRatio + 1);
    values = {
      profitPrice,
      riskPrice,
      profitRiskRatio,
      executionPrice: buy,
      reward: (profitPrice / buy) - 1,
    };
  }

  if (lock.executionPrice && lock.riskPrice && lock.profitRiskRatio) {
    const profit = (profitRiskRatio + 1) * executionPrice - profitRiskRatio * riskPrice;
    values = {
      executionPrice,
      riskPrice,
      profitRiskRatio,
      profitPrice: profit,
      reward: (profit / executionPrice) - 1,
    };
  }

  if (lock.executionPrice && lock.profitRiskRatio && lock.reward) {
    const profit = (reward + 1) * executionPrice;
    values = {
      executionPrice,
      profitRiskRatio,
      reward,
      profitPrice: profit,
      riskPrice: calcLongRiskPriceByRatio(profit, executionPrice, profitRiskRatio),
    };
  }

  if (lock.profitPrice && lock.profitRiskRatio && lock.reward) {
    const buy = profitPrice / (reward + 1);
    values = {
      profitPrice,
      profitRiskRatio,
      reward,
      executionPrice: buy,
      riskPrice: calcLongRiskPriceByRatio(profitPrice, buy, profitRiskRatio),
    };
  }

  if (values) {
    return roundObject(values, 3);
  }
  throw new Error(`calcLongProfitRiskValues without lock given: ${JSON.stringify(lock)}`);
}

function calcShortRiskPriceByRatio(profitPrice, executionPrice, profitRiskRatio) {
  return executionPrice + (executionPrice - profitPrice) / profitRiskRatio;
}

function calcShortReward(profitPrice, executionPrice) {
  return (executionPrice - profitPrice) / executionPrice;
}

export function calcShortProfitRiskValues({ profitPrice, executionPrice, riskPrice, profitRiskRatio, reward, lock }) {
  let values = null;

  if (lock.profitPrice && lock.executionPrice && lock.riskPrice) {
    values = {
      profitPrice,
      executionPrice,
      riskPrice,
      profitRiskRatio: calcProfitRiskRatio(profitPrice, executionPrice, riskPrice),
      reward: calcShortReward(profitPrice, executionPrice),
    };
  }

  if (lock.profitPrice && lock.executionPrice && lock.profitRiskRatio) {
    values = {
      profitPrice,
      executionPrice,
      profitRiskRatio,
      riskPrice: calcShortRiskPriceByRatio(profitPrice, executionPrice, profitRiskRatio),
      reward: calcShortReward(profitPrice, executionPrice),
    };
  }

  if (lock.profitPrice && lock.riskPrice && lock.profitRiskRatio) {
    const execution = riskPrice - (riskPrice - profitPrice) / (1 + profitRiskRatio);
    values = {
      profitPrice,
      riskPrice,
      profitRiskRatio,
      executionPrice: execution,
      reward: calcShortReward(profitPrice, execution),
    };
  }

  if (lock.executionPrice && lock.riskPrice && lock.profitRiskRatio) {
    const profit = executionPrice - (riskPrice - executionPrice) * profitRiskRatio;
    values = {
      executionPrice,
      riskPrice,
      profitRiskRatio,
      profitPrice: profit,
      reward: calcShortReward(profit, executionPrice),
    };
  }

  if (lock.executionPrice && lock.profitRiskRatio && lock.reward) {
    const profit = executionPrice * (1 - reward);
    values = {
      executionPrice,
      profitRiskRatio,
      reward,
      profitPrice: profit,
      riskPrice: calcShortRiskPriceByRatio(profit, executionPrice, profitRiskRatio),
    };
  }

  if (lock.profitPrice && lock.profitRiskRatio && lock.reward) {
    const execution = profitPrice / (1 - reward);
    values = {
      profitPrice,
      profitRiskRatio,
      reward,
      executionPrice: execution,
      riskPrice: calcShortRiskPriceByRatio(profitPrice, execution, profitRiskRatio),
    };
  }

  if (values) {
    return roundObject(values, 3);
  }
  throw new Error(`calcShortProfitRiskValues without lock given: ${JSON.stringify(lock)}`);
}
