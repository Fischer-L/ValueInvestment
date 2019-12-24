const { env } = require('../../build/config_server');

class CollectionBase {
  constructor(db, options) {
    this._db = db;
    this._version = 0;
    this._name = `${this.constructor.name}_v${this._version}${env === 'production' ? '' : '_dev'}`;
    this._options = options;
  }

  // Called before saving docs, should return correct docs to save
  _sanitizeDocs(data = []) { // eslint-disable-line no-unused-vars
    throw new Error(`${this.constructor.name} should implement _sanitizeDocs`);
  }

  // Called before updating data, should return correct data to update
  _sanitizeDataOnUpdate(id, data) { // eslint-disable-line no-unused-vars
    throw new Error(`${this.constructor.name} should implement _sanitizeDataOnUpdate`);
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

  async get(ids = []) {
    if (!ids || ids.length === 0) return [];

    try {
      const collection = await this.getCollection();
      if (ids.length === 1) {
        return collection.findOne({ _id: ids[0] }).then(data => [ data ]);
      }
      return collection.find({ _id: { $in: ids } }, { sort: { _id: 1 } }).toArray();
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async save(data = []) {
    if (data.length === 0) return;

    let result = null;
    try {
      const collection = await this.getCollection();
      const docs = this._sanitizeDocs(data).map(doc => {
        doc._id = doc.id;
        return doc;
      });
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

  async update(id, data) {
    if (!id || !data) return;
    try {
      const collection = await this.getCollection();
      await collection.updateOne({ _id: id }, { $set: this._sanitizeDataOnUpdate(id, data) });
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
}

module.exports = CollectionBase;
