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
      },
    },
  },
};

class BookmarksCollection extends CollectionBase {
  constructor(db) {
    super(db, COLLECTION_OPTIONS);
  }

  _sanitizeDocs(bookmarks) {
    return bookmarks.map(bookmark => ({
      ...bookmark,
      _id: bookmark.id,
    }));
  }
}

module.exports = BookmarksCollection;
