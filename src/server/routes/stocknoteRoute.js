const HTTP = require('../httpStatusCodes');
const { getCollection } = require('../db/mongo');
const CacheProvider = require('../cacheProvider');
const { collectPayload } = require('../middlewares');

const mongoCache = new CacheProvider({ maxAge: -1 });

function collectAction(req, res, next) {
  try {
    if (req.body.action) {
      res.locals.action = req.body.action;
    } else {
      throw new Error(`No action in body to collect - ${JSON.stringify(req.body)}`);
    }
  } catch (e) {
    res.status(HTTP.BAD_REQUEST).send(e.toString());
    return;
  }
  next();
}

function initStocknoteRoute(app) {
  app.put('/stocknote/', collectPayload, async (req, res) => {
    const { payload } = res.locals;
    try {
      await getCollection('stockNotes').then(collection => collection.save([ payload ]));
      res.sendStatus(HTTP.OK);
    } catch (e) {
      console.error(e);
      res.status(HTTP.INTERNAL_SERVER_ERROR).send(e.toString());
    } finally {
      mongoCache.remove(payload.id);
    }
  });

  app.get('/stocknote/:id', async (req, res) => {
    const id = req.params.id;
    let data = mongoCache.get(id);
    if (!data) {
      try {
        data = await getCollection('stockNotes').then(collection => collection.get([ id ]));
        data = data[0];
        mongoCache.set(id, data);
      } catch (e) {
        console.error(e);
        res.status(HTTP.INTERNAL_SERVER_ERROR).send(e.toString());
        return;
      }
    }
    res.json(data);
  });

  app.post('/stocknote/:id/note', collectPayload, collectAction, async (req, res) => {
    const id = req.params.id;
    const { payload, action } = res.locals;
    try {
      await getCollection('stockNotes').then(collection => collection.update(id, { ...payload, action }));
      res.sendStatus(HTTP.OK);
    } catch (e) {
      console.error(e);
      res.status(HTTP.INTERNAL_SERVER_ERROR).send(e.toString());
    } finally {
      mongoCache.remove(id);
    }
  });

  app.delete('/stocknote/:id', async (req, res) => {
    const id = req.params.id;
    try {
      await getCollection('stockNotes').then(collection => collection.remove([ id ]));
      res.sendStatus(HTTP.OK);
    } catch (e) {
      console.error(e);
      res.status(HTTP.INTERNAL_SERVER_ERROR).send(e.toString());
    } finally {
      mongoCache.remove(id);
    }
  });
}

module.exports = initStocknoteRoute;
