const { closeMongoDB, connectMongoDB } = require('../../db/mongo');

async function createTestCollection(CollectionClass) {
  const db = await connectMongoDB();
  const collection = new CollectionClass(db);
  collection._name = `TEST_${collection._name}`;
  return {
    collection,
    async destroy() {
      try {
        const instance = await this.collection.getCollection();
        await instance.drop();
      } catch (e) {
        throw e;
      } finally {
        await closeMongoDB();
      }
    },
  };
}

module.exports = createTestCollection;
