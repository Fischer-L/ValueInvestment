const Mongo = require('mongodb').MongoClient;
const { DB_URL } = require('../../build/config_server');
const PttUsersCollection = require('./PttUsersCollection');
const BookmarksCollection = require('./BookmarksCollection');

const options = {
  useUnifiedTopology: true,
};

let mongoDB = null;
let mongoClient = null;
let connectPromise = null;

const collections = {
  pttUsers: {
    instance: null,
    Clazz: PttUsersCollection,
  },
  bookmarks: {
    instance: null,
    Clazz: BookmarksCollection,
  },
};

async function closeMongoDB() {
  if (mongoClient) {
    const client = mongoClient;
    mongoDB = mongoClient = connectPromise = null;
    await client.close();
  }
}

async function connectMongoDB() {
  if (connectPromise) await connectPromise;
  if (mongoClient && mongoClient.isConnected()) return mongoDB;

  try {
    connectPromise = Mongo.connect(DB_URL, options);
    mongoClient = await connectPromise;
    mongoDB = mongoClient.db();
    console.log('Connection established to', DB_URL);
  } catch (e) {
    console.error(e);
  }
  return mongoDB;
}

async function getCollection(name) {
  const collection = collections[name];
  if (!collection) {
    throw new Error(`Access unknown collection of ${name}`);
  }
  if (mongoClient && !mongoClient.isConnected()) {
    collection.instance = null;
  }
  if (!collection.instance) {
    const db = await connectMongoDB();
    collection.instance = new collection.Clazz(db);
  }
  return collection.instance;
}

module.exports = {
  closeMongoDB,
  connectMongoDB,
  getCollection,
};
