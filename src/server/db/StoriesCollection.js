const CollectionBase = require('./CollectionBase');

// Schema:
// {
//   _id: this.id,
//   id: string,
//   title: string,
// }
class StoriesCollection extends CollectionBase {
  _sanitizeDocs(stories) {
    return stories
      .filter(({ id, title }) => !!id && !!title)
      .map(({ id, title }) => ({ id: String(id), title: String(title) }));
  }
}

module.exports = StoriesCollection;
