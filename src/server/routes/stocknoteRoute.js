const HTTP = require('../httpStatusCodes');
const { getCollection } = require('../db/mongo');
const CacheProvider = require('../cacheProvider');
const { collectPayload } = require('../middlewares');

const mongoCache = new CacheProvider({ maxAge: -1 });
const sortNotesByAsc = ({ notes }) => notes.sort((a, b) => a.createTime - b.createTime);

const reverseNotes = {
  TIMESTAMP: 1579159482427,
  async run() {
    const stockNotes = await getCollection('stockNotes');
    const docs = await stockNotes.getAll();
    docs.forEach(doc => {
      if (doc.lastUpdateTime >= this.TIMESTAMP) return;
      sortNotesByAsc(doc);
      stockNotes.update(doc.id, doc);
    });
    console.log('reverseNotes ran');
  },
};
reverseNotes.run();

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

  app.post('/stocknote/:id', collectPayload, async (req, res) => {
    const id = req.params.id;
    const { payload } = res.locals;
    try {
      await getCollection('stockNotes').then(collection => collection.update(id, payload));
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
