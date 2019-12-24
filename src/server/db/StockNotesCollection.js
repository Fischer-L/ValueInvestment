const CollectionBase = require('./CollectionBase');

// Schema:
// {
//   _id: this.id,
//   id: string; stock id,
//   name: string; stock name,
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
  _sanitizeDocs(items) {
    return items
      .slice(0, 20)
      .filter(item => item.id && item.name && item.notes && item.notes.length)
      .map(item => ({
        ...item,
        id: String(item.id),
        lastUpdateTime: item.notes[0].createTime,
      }));
  }

  _sanitizeDataOnUpdate(id, { notes }) {
    if (!notes || notes.length === 0) {
      throw new Error(`Update stock note of ${id} with empty notes`);
    }
    return {
      notes,
      lastUpdateTime: notes[0].createTime,
    };
  }
}

module.exports = StockNotesCollection;
