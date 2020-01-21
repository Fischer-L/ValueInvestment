const CollectionBase = require('./CollectionBase');

const clone = data => data && JSON.parse(JSON.stringify(data));

// Schema:
// {
//   _id: this.id,
//   id: string; stock id,
//   lastUpdateTime: int, ms elapsed since January 1, 1970 00:00:00 UTC,
//   notes: [ // Ordered by `createTime` in the ASC order
//     {
//       trade: {
//         comment: string,
//       },
//       value: {
//         comment: string,
//       },
//       story: {
//         comment: string,
//       },
//       fundamentals: {
//         comment: string,
//       },
//       technicals: {
//         comment: string,
//       },
//       chips: {
//         comment: string,
//       },
//       createTime: int, ms elapsed since January 1, 1970 00:00:00 UTC,
//     }
//   ]
// }
class StockNotesCollection extends CollectionBase {

  static get NOTES_SIZE_LIMIT() {
    return 60;
  }

  _contentInNote(note) {
    if (!note) return false;
    const keys = [ 'trade', 'value', 'story', 'fundamentals', 'technicals', 'chips'];
    return keys.some(key => note[key] && note[key].comment);
  }

  _sanitizeDocs(items) {
    const now = Date.now();
    return items
      .filter(item => !!item.id && this._contentInNote(item.note))
      .map(item => ({
        id: String(item.id),
        notes: [ { ...item.note, createTime: now } ],
        lastUpdateTime: now,
      }));
  }

  async _update(collection, id, { note }) {
    if (!this._contentInNote(note)) {
      throw new Error(`Update stock note of ${id} with invalid note: ${JSON.stringify(note)}`);
    }

    const now = Date.now();
    const query = { _id: id };
    const promises = [
      collection.updateOne(query, { $set: { lastUpdateTime: now } }),
    ];
    if (note.createTime > 0) {
      query['notes.createTime'] = note.createTime;
      promises.push(collection.updateOne(query, { $set: { 'notes.$': note } }));
    } else {
      note = clone(note);
      note.createTime = now;
      promises.push(collection.updateOne(query, { $push: { notes: note } }));
    }
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
    const limit = StockNotesCollection.NOTES_SIZE_LIMIT;

    let docs = await super.get(ids);
    docs = docs.map(doc => {
      if (doc.notes.length > limit) {
        doc.notes.splice(0, doc.notes.length - limit);
        docsOverLimit.push(doc);
      }
      return doc;
    });
    setImmediate(() => this._overrideNotes(docsOverLimit));
    return docs;
  }
}

module.exports = StockNotesCollection;
