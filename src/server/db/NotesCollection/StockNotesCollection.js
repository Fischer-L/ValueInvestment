const NotesCollectionBase = require('./NotesCollectionBase');

const clone = data => data && JSON.parse(JSON.stringify(data));

// Note schema:
// {
//   trade: {
//     comment: string,
//   },
//   value: {
//     comment: string,
//   },
//   story: {
//     comment: string,
//   },
//   fundamentals: {
//     comment: string,
//   },
//   technicals: {
//     comment: string,
//   },
//   chips: {
//     comment: string,
//   },
// }
class StockNotesCollection extends NotesCollectionBase {

  _noteHasContent(note) {
    if (!note) return false;
    const keys = [ 'trade', 'value', 'story', 'fundamentals', 'technicals', 'chips'];
    return note.createTime > 0 && keys.some(key => note[key] && note[key].comment);
  }

  _sanitizeDocs(items) {
    const now = Date.now();
    return items
      .filter(item => !!item.id && this._noteHasContent(item.note))
      .map(item => ({
        id: String(item.id),
        notes: [ clone(item.note) ],
        lastUpdateTime: now,
      }));
  }
}

module.exports = StockNotesCollection;
