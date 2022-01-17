import getURL, { SITE } from '~/utils/getURL';

export const PATH_TYPE = {
  PE: SITE.pe,
  EPS: SITE.eps,
  TECHNICAL: SITE.technical,
};

export default function gwURL(type, stockId) {
  return getURL(type, null, { stockId });
}
