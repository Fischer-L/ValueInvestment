const HTTP = require('../httpStatusCodes');
const { getCollection } = require('../db/mongo');
const CacheProvider = require('../cacheProvider');
const { collectIDs, collectPayload } = require('../middlewares');

const mongoCache = new CacheProvider({ maxAge: -1 });

const BOOKMARK_TYPE = {
  STOCK: 'stock',
  PTT_USER: 'pttuser',
};

function initBookmarksRoute(app) {
  app.get('/bookmarks', async (req, res) => {
    let data = mongoCache.get(req);
    if (!data) {
      try {
        const [ pttUsers, stocks ] = await Promise.all([
          getCollection('pttUsers').then(collection => collection.getAll()),
          getCollection('bookmarks').then(collection => collection.getAll()),
        ]);
        data = { pttUsers, stocks };
        mongoCache.set(req, data);
      } catch (e) {
        console.error(e);
        res.status(HTTP.INTERNAL_SERVER_ERROR).send(e.toString());
        return;
      }
    }
    res.json(data);
  });

  app.post('/bookmarks/:type*?', collectPayload, async (req, res) => {
    try {
      const { payload } = res.locals;
      const collectionName = req.params.type === BOOKMARK_TYPE.PTT_USER ? 'pttUsers' : 'bookmarks';
      await getCollection(collectionName).then(collection => collection.save(payload));
      res.sendStatus(HTTP.OK);
    } catch (e) {
      res.status(HTTP.INTERNAL_SERVER_ERROR).send(e.toString());
    } finally {
      mongoCache.remove(req);
    }
  });

  app.delete('/bookmarks/:type*?', collectIDs, async (req, res) => {
    try {
      const { ids } = res.locals;
      const collectionName = req.params.type === BOOKMARK_TYPE.PTT_USER ? 'pttUsers' : 'bookmarks';
      await getCollection(collectionName).then(collection => collection.remove(ids));
      res.sendStatus(HTTP.OK);
    } catch (e) {
      res.status(HTTP.INTERNAL_SERVER_ERROR).send(e.toString());
    } finally {
      mongoCache.remove(req);
    }
  });
}

module.exports = initBookmarksRoute;
