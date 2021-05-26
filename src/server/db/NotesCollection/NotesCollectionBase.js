const CollectionBase = require('../CollectionBase');

// Schema:
// {
//   _id: this.id,
//   id: string; note id,
//   lastUpdateTime: int, ms elapsed since January 1, 1970 00:00:00 UTC,
//   notes: [ // Ordered by `createTime` in the ASC order
//     {
//       createTime: int, ms, will also be the note id

//       // Custom note data
//     }
//   ],
//   noteMeta: {
//     // Custome note meta data
//   }
// }
class NotesCollectionBase extends CollectionBase {

  static get NOTES_SIZE_LIMIT() {
    return 60;
  }

  static get NOTES_ACTION() {
    return {
      ADD: 'ADD',
      UPDATE: 'UPDATE',
      DELETE: 'DELETE',
    };
  }

  _noteHasContent(note) { // eslint-disable-line no-unused-vars
    throw new Error(`${this.constructor.name} should implement _noteHasContent`);
  }

  async _update(collection, id, { note, action }) {
    if (!this._noteHasContent(note)) {
      throw new Error(`Update stock note of ${id} with invalid note: ${JSON.stringify(note)}`);
    }

    const promises = [];
    const query = { _id: id };
    const { ADD, UPDATE, DELETE } = NotesCollectionBase.NOTES_ACTION;
    switch (action.toUpperCase()) {
      case ADD:
        promises.push(collection.updateOne(query, { $push: { notes: note } }));
        break;

      case UPDATE:
        query['notes.createTime'] = note.createTime;
        promises.push(collection.updateOne(query, { $set: { 'notes.$': note } }));
        break;

      case DELETE:
        promises.push(collection.updateOne(query, { $pull: { notes: { createTime: note.createTime } } }));
        break;

      default:
        throw new Error(`Update stock note of ${id} with invalid action: ${action}`);
    }
    promises.push(collection.updateOne(query, { $set: { lastUpdateTime: Date.now() } }));
    await Promise.all(promises);
  }

  async _overrideNotes(docs) {
    if (!docs.length) return;

    try {
      const collection = await this.getCollection();
      docs.forEach(({ id, notes }) => {
        collection.updateOne({ _id: id }, { $set: { notes } });
      });
    } catch (e) {
      console.log(e);
    }
  }

  async get(ids = []) {
    const docsOverLimit = [];
    const limit = NotesCollectionBase.NOTES_SIZE_LIMIT;

    let docs = await super.get(ids);
    docs = docs.map(doc => {
      if (doc && doc.notes.length > limit) {
        doc.notes.splice(0, doc.notes.length - limit);
        docsOverLimit.push(doc);
      }
      return doc;
    });
    setImmediate(() => this._overrideNotes(docsOverLimit));
    return docs;
  }
}

module.exports = NotesCollectionBase;
