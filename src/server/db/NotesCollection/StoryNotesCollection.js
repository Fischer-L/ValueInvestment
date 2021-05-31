const NotesCollectionBase = require('./NotesCollectionBase');

const clone = data => data && JSON.parse(JSON.stringify(data));

// Note schema
// note: {
//   good: {
//     comment: string,
//   },
//   bad: {
//     comment: string,
//   },
// }
//
// Note meta schema
// noteMeta: {
//   title: string,
// }
class StoryNotesCollection extends NotesCollectionBase {

  _validMeta(noteMeta) {
    return noteMeta && noteMeta.title;
  }

  _noteHasContent(note) {
    if (!note) return false;
    const keys = [ 'good', 'bad' ];
    return note.createTime > 0 && keys.some(key => note[key] && note[key].comment);
  }

  _sanitizeDocs(items) {
    const now = Date.now();
    return items
      .filter(item => {
        if (!item.id) {
          console.error('StoryNotesCollection - _sanitizeDocs - item without id:', item);
          return false;
        }
        if (!this._noteHasContent(item.note)) {
          console.error('StoryNotesCollection - _sanitizeDocs - item without note:', item);
          return false;
        }
        if (!this._validMeta(item.noteMeta)) {
          console.error('StoryNotesCollection - _sanitizeDocs - item with invalid noteMeta:', item);
          return false;
        }
        return true;
      })
      .map(item => ({
        id: String(item.id),
        notes: [ clone(item.note) ],
        noteMeta: item.noteMeta,
        lastUpdateTime: now,
      }));
  }
}

module.exports = StoryNotesCollection;
