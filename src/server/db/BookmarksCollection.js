const CollectionBase = require('./CollectionBase');

// https://docs.mongodb.com/manual/core/schema-validation/
const COLLECTION_OPTIONS = {
  strict: true,
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: [ 'id', 'name' ],
      properties: {
        id: {
          bsonType: 'string',
          description: 'Stock id',
        },
        name: {
          bsonType: 'string',
          description: 'Stock name',
        },
        market: {
          bsonType: 'string',
          description: 'Market where stock is traded',
        },
      },
    },
  },
};

class BookmarksCollection extends CollectionBase {
  constructor(db) {
    super(db, { options: COLLECTION_OPTIONS });
  }

  _sanitizeDocs(bookmarks) {
    return bookmarks.map(bookmark => ({ ...bookmark, id: bookmark.id.toUpperCase() }));
  }
}

module.exports = BookmarksCollection;
