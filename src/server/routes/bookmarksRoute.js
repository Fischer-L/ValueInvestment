const HTTP = require('../httpStatusCodes');
const { getCollection } = require('../db/mongo');
const CacheProvider = require('../cacheProvider');
const { collectIDs, collectPayload } = require('../middlewares');

const mongoCache = new CacheProvider({ maxAge: -1 });

const BOOKMARK_TYPE = {
  STOCK: 'stock',
  PTT_USER: 'pttuser',
};

const COLLECTION_NAME = {
  [ BOOKMARK_TYPE.STOCK ]: 'bookmarks',
  [ BOOKMARK_TYPE.PTT_USER ]: 'pttUsers',
};

async function getBookmarks(type) {
  let data = mongoCache.get(type);
  if (!data) {
    data = await getCollection(COLLECTION_NAME[ type ]).then(collection => collection.getAll());
  }
  mongoCache.set(type, data);
  return data;
}

function initBookmarksRoute(app) {
  app.get('/bookmarks', async (req, res) => {
    let data = null;
    if (!data) {
      try {
        const [ stocks, pttUsers ] = await Promise.all([
          getBookmarks(BOOKMARK_TYPE.STOCK),
          getBookmarks(BOOKMARK_TYPE.PTT_USER),
        ]);
        data = { stocks, pttUsers };
      } catch (e) {
        console.error(e);
        res.status(HTTP.INTERNAL_SERVER_ERROR).send(e.toString());
        return;
      }
    }
    res.json(data);
  });

  app.post('/bookmarks/:type', collectPayload, async (req, res) => {
    try {
      const { payload } = res.locals;
      const name = COLLECTION_NAME[ req.params.type ];
      await getCollection(name).then(collection => collection.save(payload));
      res.sendStatus(HTTP.OK);
    } catch (e) {
      res.status(HTTP.INTERNAL_SERVER_ERROR).send(e.toString());
    } finally {
      mongoCache.remove(req.params.type);
    }
  });

  app.delete('/bookmarks/:type', collectIDs, async (req, res) => {
    try {
      const { ids } = res.locals;
      const name = COLLECTION_NAME[ req.params.type ];
      await getCollection(name).then(collection => collection.remove(ids));
      res.sendStatus(HTTP.OK);
    } catch (e) {
      res.status(HTTP.INTERNAL_SERVER_ERROR).send(e.toString());
    } finally {
      mongoCache.remove(req.params.type);
    }
  });
}

module.exports = initBookmarksRoute;
