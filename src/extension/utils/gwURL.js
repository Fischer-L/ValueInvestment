import DOMAINS from '~/utils/domains';

export const PATH_TYPE = {
  PE: 'PE',
  EPS: 'EPS',
};

export default function gwURL(type, id) {
  let path = '';
  switch (type) {
    case PATH_TYPE.PE:
      path = [ '/', 'stock', '/', id, '/', 'enterprise', '-', 'value', '/', 'price', '-', 'to', '-', 'earning', '-', 'ratio' ].join('');
      break;

    case PATH_TYPE.EPS:
      path = [ '/', 'stock', '/', id, '/', 'financial', '-', 'statements', '/', 'eps' ].join('');
      break;
  }
  return DOMAINS.gw + path;
}
