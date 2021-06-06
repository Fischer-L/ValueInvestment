const Mongo = require('mongodb').MongoClient;
const { DB_URL } = require('../../build/config_server');
const StoriesCollection = require('./StoriesCollection');
const PttUsersCollection = require('./PttUsersCollection');
const BookmarksCollection = require('./BookmarksCollection');
const StockNotesCollection = require('./NotesCollection/StockNotesCollection');
const StoryNotesCollection = require('./NotesCollection/StoryNotesCollection');

const options = {
  useUnifiedTopology: true,
};

let mongoDB = null;
let mongoClient = null;
let connectPromise = null;

const collections = {
  stories: {
    instance: null,
    Clazz: StoriesCollection,
  },
  pttUsers: {
    instance: null,
    Clazz: PttUsersCollection,
  },
  bookmarks: {
    instance: null,
    Clazz: BookmarksCollection,
  },
  stockNotes: {
    instance: null,
    Clazz: StockNotesCollection,
  },
  storyNotes: {
    instance: null,
    Clazz: StoryNotesCollection,
  },
};

async function closeMongoDB() {
  if (mongoClient) {
    const client = mongoClient;
    mongoDB = mongoClient = connectPromise = null;
    await client.close();
  }
}

function isMongoConnected() {
  if (mongoClient) {
    if (mongoClient.isConnected()) {
      return true;
    }
    closeMongoDB().catch(e => console.error(e));
  }
  return false;
}

async function connectMongoDB() {
  if (connectPromise) await connectPromise;
  if (mongoDB && isMongoConnected()) return mongoDB;

  try {
    connectPromise = Mongo.connect(DB_URL, options);
    mongoClient = await connectPromise;
    mongoDB = mongoClient.db();
    console.log('Connection established to', DB_URL);
  } catch (e) {
    console.error(e);
  }
  connectPromise = null;
  return mongoDB;
}

async function getCollection(name) {
  const collection = collections[name];
  if (!collection) {
    throw new Error(`Access unknown collection of ${name}`);
  }
  if (!isMongoConnected()) {
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
