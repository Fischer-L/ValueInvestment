const { env } = require('../../build/config_server');

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

class BookmarksCollection {
  constructor(db) {
    this._db = db;
    this._version = 0;
    this._name = `${BookmarksCollection.name}_v${this._version}${env === 'production' ? '' : '_dev'}`;
    this._options = COLLECTION_OPTIONS;
  }

  async getCollection() {
    if (!this._collection) {
      try {
        this._collection = await this._db.createCollection(this._name, this._options);
      } catch (e) {
        this._collection = this._db.collection(this._name);
      }
    }
    return this._collection;
  }

  async getAll() {
    try {
      const collection = await this.getCollection();
      return collection.find({}, { sort: { _id: 1 } }).toArray();
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async save(bookmarks = []) {
    if (bookmarks.length === 0) return;

    let result = null;
    try {
      const collection = await this.getCollection();
      const docs = this._sanitizeDocs(bookmarks);
      const saveCount = docs.length;
      if (saveCount === 1) {
        result = await collection.insertOne(docs[0]);
      } else {
        result = await collection.insertMany(docs);
      }
      if (result.insertedCount !== saveCount) {
        throw new Error(`Save ${this._name} exception: expect to save ${saveCount} docs but only ${result.insertedCount}`);
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async remove(ids = []) {
    if (ids.length === 0) return;

    let result = null;
    try {
      const collection = await this.getCollection();
      const queries = ids.map(id => ({ _id: id }));
      const queryCount = queries.length;
      if (queryCount === 1) {
        result = await collection.deleteOne(queries[0]);
      } else {
        result = await collection.deleteMany(queries);
      }
      if (result.deletedCount !== queryCount) {
        console.warn(`Remove ${this._name} exception: expect to remove ${queryCount} docs but only ${result.deletedCount}`);
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  _sanitizeDocs(bookmarks) {
    return bookmarks.map(bookmark => ({
      ...bookmark,
      _id: bookmark.id,
    }));
  }
}

module.exports = BookmarksCollection;
