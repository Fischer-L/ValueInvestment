const HTTP = require('../httpStatusCodes');
const { getCollection } = require('../db/mongo');
const CacheProvider = require('../cacheProvider');

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

  app.post('/bookmarks/:type*?', async (req, res) => {
    let data = null;
    try {
      const payload = req.body.payload;
      if (payload instanceof Array && payload.length > 0) {
        data = payload;
      }
      if (!data) {
        throw new Error('No bookmarks to save');
      }
    } catch (e) {
      res.status(HTTP.BAD_REQUEST).send(e.toString());
      return;
    }

    try {
      const collectionName = req.params.type === BOOKMARK_TYPE.PTT_USER ? 'pttUsers' : 'bookmarks';
      const collection = await getCollection(collectionName);
      await collection.save(data);
    } catch (e) {
      res.status(HTTP.INTERNAL_SERVER_ERROR).send(e.toString());
      return;
    } finally {
      mongoCache.remove(req);
    }
    res.sendStatus(HTTP.OK);
  });

  app.delete('/bookmarks/:type*?', async (req, res) => {
    let data = null;
    try {
      const ids = req.query.ids;
      if (ids) {
        data = ids.split(',');
      }
      if (!data) {
        throw new Error('No bookmarks to delete');
      }
    } catch (e) {
      res.status(HTTP.BAD_REQUEST).send(e.toString());
      return;
    }

    try {
      const collectionName = req.params.type === BOOKMARK_TYPE.PTT_USER ? 'pttUsers' : 'bookmarks';
      const collection = await getCollection(collectionName);
      await collection.remove(data);
    } catch (e) {
      res.status(HTTP.INTERNAL_SERVER_ERROR).send(e.toString());
      return;
    } finally {
      mongoCache.remove(req);
    }

    res.sendStatus(HTTP.OK);
  });
}

module.exports = initBookmarksRoute;
