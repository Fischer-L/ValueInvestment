import Cookies from 'universal-cookie';

export const cookies = new Cookies();

export function round(v) {
  return Math.round(v * 100) / 100;
}
