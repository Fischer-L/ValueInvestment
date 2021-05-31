const createNoteRoute = require('./utils/createNoteRoute');

function initStocknoteRoute(app) {
  return createNoteRoute(app, '/stocknote', 'stockNotes');
}

module.exports = initStocknoteRoute;
