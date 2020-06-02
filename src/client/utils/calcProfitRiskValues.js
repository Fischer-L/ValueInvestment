import { roundObject } from './round'; // TODO: Find a way to import from '@/utils/round'

function calcProfitRiskRatio(profitPrice, buyPrice, riskPrice) {
  return (profitPrice - buyPrice) / (buyPrice - riskPrice);
}

function calcRiskPriceByRatio(profitPrice, buyPrice, profitRiskRatio) {
  return ((profitRiskRatio + 1) * buyPrice - profitPrice) / profitRiskRatio;
}

export default function calcProfitRiskValues({ profitPrice, buyPrice, riskPrice, profitRiskRatio, reward, lock }) {
  let values = null;

  if (lock.profitPrice && lock.buyPrice && lock.riskPrice) {
    values = {
      profitPrice,
      buyPrice,
      riskPrice,
      profitRiskRatio: calcProfitRiskRatio(profitPrice, buyPrice, riskPrice),
      reward: (profitPrice / buyPrice) - 1,
    };
  }

  if (lock.profitPrice && lock.buyPrice && lock.profitRiskRatio) {
    values = {
      profitPrice,
      buyPrice,
      profitRiskRatio,
      riskPrice: calcRiskPriceByRatio(profitPrice, buyPrice, profitRiskRatio),
      reward: (profitPrice / buyPrice) - 1,
    };
  }

  if (lock.profitPrice && lock.riskPrice && lock.profitRiskRatio) {
    const buy = (profitPrice + profitRiskRatio * riskPrice) / (profitRiskRatio + 1);
    values = {
      profitPrice,
      riskPrice,
      profitRiskRatio,
      buyPrice: buy,
      reward: (profitPrice / buy) - 1,
    };
  }

  if (lock.buyPrice && lock.riskPrice && lock.profitRiskRatio) {
    const profit = (profitRiskRatio + 1) * buyPrice - profitRiskRatio * riskPrice;
    values = {
      buyPrice,
      riskPrice,
      profitRiskRatio,
      profitPrice: profit,
      reward: (profit / buyPrice) - 1,
    };
  }

  if (lock.buyPrice && lock.profitRiskRatio && lock.reward) {
    const profit = (reward + 1) * buyPrice;
    values = {
      buyPrice,
      profitRiskRatio,
      reward,
      profitPrice: profit,
      riskPrice: calcRiskPriceByRatio(profit, buyPrice, profitRiskRatio),
    };
  }

  if (lock.profitPrice && lock.profitRiskRatio && lock.reward) {
    const buy = profitPrice / (reward + 1);
    values = {
      profitPrice,
      profitRiskRatio,
      reward,
      buyPrice: buy,
      riskPrice: calcRiskPriceByRatio(profitPrice, buy, profitRiskRatio),
    };
  }

  if (values) {
    return roundObject(values);
  }
  throw new Error(`calcProfitRiskValues without lock given: ${JSON.stringify(lock)}`);
}
