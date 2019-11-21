const HTTP = require('../httpStatusCodes');
const { getCollection } = require('../db/mongo');
const CacheProvider = require('../cacheProvider');

const mongoCache = new CacheProvider({ maxAge: -1 });

function initBookmarksRoute(app) {
  app.get('/bookmarks', async (req, res) => {
    let data = mongoCache.get(req);
    if (!data) {
      try {
        const bookmarks = await getCollection('bookmarks');
        data = await bookmarks.getAll();
        mongoCache.set(req, data);
      } catch (e) {
        console.error(e);
        res.status(HTTP.INTERNAL_SERVER_ERROR).send(e.toString());
        return;
      }
    }
    res.json(data);
  });

  app.post('/bookmarks', async (req, res) => {
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
      const bookmarks = await getCollection('bookmarks');
      await bookmarks.save(data);
    } catch (e) {
      res.status(HTTP.INTERNAL_SERVER_ERROR).send(e.toString());
      return;
    } finally {
      mongoCache.remove(req);
    }
    res.sendStatus(HTTP.OK);
  });

  app.delete('/bookmarks', async (req, res) => {
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
      const bookmarks = await getCollection('bookmarks');
      await bookmarks.remove(data);
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
