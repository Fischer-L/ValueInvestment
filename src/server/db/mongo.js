const Mongo = require('mongodb').MongoClient;
const { DB_URL } = require('../../build/config_server');

const options = {
  useUnifiedTopology: true,
};

Mongo.connect(DB_URL, options, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', DB_URL);
  } else {
    console.log('Connection established to', DB_URL);
    db.close();
  }
});

module.exports = Mongo;
