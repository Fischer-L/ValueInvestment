import { JSDOM } from 'jsdom';

const docs = {};

const keyOf = html => html.substring(0, html.search(' -->'));

export default function fakeDOMParser() {
  return {
    parseFromString: html => {
      const key = keyOf(html);
      if (!docs[key]) {
        docs[key] = (new JSDOM(html)).window.document;
      }
      return docs[key];
    },
  };
}
