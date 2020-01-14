const CollectionBase = require('./CollectionBase');

// Schema:
// {
//   _id: this.id,
//   id: string; stock id,
//   lastUpdateTime: int, ms elapsed since January 1, 1970 00:00:00 UTC,
//   notes: [
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
  _isNoteValid(note) {
    if (!note) return false;

    if (!(note.createTime > 0)) return false;

    const keys = [ 'trade', 'value', 'story', 'fundamentals', 'technicals', 'chips'];
    return keys.some(key => note[key] && note[key].comment);
  }

  _areNotesValid(notes) {
    return notes && notes.length > 0 && !notes.some(note => !this._isNoteValid(note));
  }

  _sanitizeDocs(items) {
    return items
      .slice(0, 60)
      .filter(item => item.id && this._areNotesValid(item.notes))
      .map(item => ({
        ...item,
        id: String(item.id),
        lastUpdateTime: item.notes[0].createTime,
      }));
  }

  _sanitizeDataOnUpdate(id, { notes }) {
    if (!this._areNotesValid(notes)) {
      throw new Error(`Update stock note of ${id} with invalid notes: ${JSON.stringify(notes)}`);
    }
    return {
      notes,
      lastUpdateTime: notes[0].createTime,
    };
  }
}

module.exports = StockNotesCollection;
