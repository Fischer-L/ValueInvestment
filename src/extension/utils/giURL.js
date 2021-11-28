import DOMAINS from '~/utils/domains';

export const PATH_TYPE = {
  LIST: 'LIST',
};

export default function giURL(type) {
  let path = '';
  switch (type) {
    case PATH_TYPE.LIST:
      path = [ '/', 'Stock', 'Info', '/', 'Stock', 'List.asp' ].join('');
      break;
  }
  return DOMAINS.gi + path;
}
