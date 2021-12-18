import getURL from '~/utils/getURL';

let yaUsHash = '';
import('./getYaUsHash').then(resp => yaUsHash = resp.default());

export default function (site, query, pathParams) {
  return getURL(site, query, pathParams, yaUsHash);
};
