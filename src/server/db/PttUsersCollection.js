const CollectionBase = require('./CollectionBase');

// Schema:
// {
//   _id: this.id,
//   id: string; Ptt user id,
// }
class PttUsersCollection extends CollectionBase {
  _sanitizeDocs(users) {
    return users.map(({ id }) => String(id)).filter(id => !!id).map(id => ({ id }));
  }
}

module.exports = PttUsersCollection;
