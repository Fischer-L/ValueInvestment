const HTTP = require('../httpStatusCodes');
const { getCollection } = require('../db/mongo');
const CacheProvider = require('../cacheProvider');
const { collectIDs, collectPayload } = require('../middlewares');

const mongoCache = new CacheProvider({ maxAge: -1 });

function initStocknotesRoute(app) {
  app.get('/stocknotes/', async (req, res) => {
    let data = mongoCache.get(req);
    if (!data) {
      try {
        data = await getCollection('stockNotes').then(collection => collection.getAll());
        mongoCache.set(req, data);
      } catch (e) {
        console.error(e);
        res.status(HTTP.INTERNAL_SERVER_ERROR).send(e.toString());
        return;
      }
    }
    res.json(data);
  });

  app.post('/stocknotes/', collectPayload, async (req, res) => {
    try {
      const { payload } = res.locals;
      await getCollection('stockNotes').then(collection => collection.save(payload));
    } catch (e) {
      res.status(HTTP.INTERNAL_SERVER_ERROR).send(e.toString());
      return;
    } finally {
      mongoCache.remove(req);
    }
    res.sendStatus(HTTP.OK);
  });

  app.delete('/stocknotes/', collectIDs, async (req, res) => {
    try {
      const { ids } = res.locals;
      await getCollection('stockNotes').then(collection => collection.remove(ids));
    } catch (e) {
      res.status(HTTP.INTERNAL_SERVER_ERROR).send(e.toString());
      return;
    } finally {
      mongoCache.remove(req);
    }
    res.sendStatus(HTTP.OK);
  });
}

module.exports = initStocknotesRoute;
