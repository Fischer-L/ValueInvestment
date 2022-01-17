import getURL, { SITE as _SITE } from '~/utils/getURL';

let yaUsHash = '';
import('./getYaUsHash').then(resp => yaUsHash = resp.default());

export const SITE = _SITE;

export default function (site, query, pathParams) {
  return getURL(site, query, pathParams, yaUsHash);
};
