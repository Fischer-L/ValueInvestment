const Mongo = require('mongodb').MongoClient;
const { DB_URL } = require('../../build/config_server');
const BookmarksCollection = require('./BookmarksCollection');

const options = {
  useUnifiedTopology: true,
};

let mongoDB = null;
let mongoClient = null;

const collections = {
  bookmarks: {
    instance: null,
    Clazz: BookmarksCollection,
  },
};

async function closeMongoDB() {
  if (mongoClient) {
    const client = mongoClient;
    mongoDB = mongoClient = null;
    await client.close();
  }
}

async function connectMongoDB() {
  if (mongoClient && mongoClient.isConnected()) return mongoDB;

  try {
    mongoClient = await Mongo.connect(DB_URL, options);
    mongoDB = mongoClient.db();
    console.log('Connection established to', DB_URL);
  } catch (e) {
    console.error(e);
  }
  return mongoDB;
}

async function getCollection(name) {
  const collection = collections[name];
  if (collection === undefined) {
    throw new Error(`Access unknown collection of ${name}`);
  }
  if (collection.instance) {
    return collection.instance;
  }
  const db = await connectMongoDB();
  collection.instance = new collection.Clazz(db);
  return collection.instance;
}

module.exports = {
  closeMongoDB,
  connectMongoDB,
  getCollection,
};
