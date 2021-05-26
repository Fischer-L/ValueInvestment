const createNoteRoute = require('./utils/createNoteRoute');

function initStorynoteRoute(app) {
  return createNoteRoute(app, '/storynote', 'storyNotes');
}

module.exports = initStorynoteRoute;
