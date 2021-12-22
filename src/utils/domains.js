const middleName = {
  of(key) {
    return this[key].filter((v, i) => i % 2 === 0).join('');
  },
  fg: [ 'f', '3', 'u', '9', 'g', '1', 'l', '7', 'e' ],
  ya: [ 'y', '6', 'a', 'd', 'h', 'b', 'o', 'f', 'o' ],
  gi: [ 'g', 'z', 'o', '5', 'o', '1', 'd', 'p', 'i', 'u', 'n', '9', 'f', 'j', 'o' ],
  gw: [ 'w', '5', 'a', 'q', 'n', 'n', 't', 'a', 'g', 'o', 'o', 'p', 'o' ],
  cmy: [ 'c', 'a', 'm', 'p', 'o', 'q', 'n', '3', 'e', '1', 'y'],
  hi: [ 'h', 'n', 'i', 'p', 's', 'r', 't', 'z', 'o', 'a', 'c', 'q', 'k' ],
  nt: [ 'n', 'b', 'o', 'd', 'r', 'l', 'w', 'r', 'a', 'a', 'y', '5', '.', '8', 't', 'y', 'w', '0', 's', 'e', 't', 'g', 'h', '1', 'r' ],
};

const DOMAINS = {
  hi: `https://${middleName.of('hi')}.tw`,
  gi: `https://${middleName.of('gi')}.tw`,
  nt: `https://${middleName.of('nt')}.info`,
  gw: `https://www.${middleName.of('gw')}.com`,
  fg: `https://www.${middleName.of('fg')}.tw`,
  cmy: `https://www.${middleName.of('cmy')}.tw`,
  yFinance: `https://finance.${middleName.of('ya')}.com`,
};

module.exports = DOMAINS;
