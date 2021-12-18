import getURL from '~/utils/getURL';

export const PATH_TYPE = {
  PE: 'PE',
  EPS: 'EPS',
  TECHNICAL: 'TECHNICAL',
};

export default function gwURL(type, stockId) {
  switch (type) {
    case PATH_TYPE.PE:
      return getURL('pe', null, { stockId });

    case PATH_TYPE.EPS:
      return getURL('eps', null, { stockId });

    case PATH_TYPE.TECHNICAL:
      return getURL('technical', null, { stockId });
  }
}
