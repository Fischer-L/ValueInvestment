const express = require('express');
const compression = require('compression');
const cookieParser = require('cookie-parser');

const { env, port, publicDir } = require('../build/config_server');
const middlewares = require('./middlewares');
const initStocknoteRoute = require('./routes/stocknoteRoute');
const initStockinfoRoute = require('./routes/stockinfoRoute');
const initBookmarksRoute = require('./routes/bookmarksRoute');

const PUBLIC_DIR = publicDir;
const PORT = port;
const app = express();

app.use(compression());
app.use(cookieParser());
app.use(express.json());

app.use(express.static(PUBLIC_DIR, {
  setHeaders(res, path) {
    if (path.includes('/index.html')) return;
    res.set('Cache-Control', 'public, max-age=31536000');
  },
}));

initStocknoteRoute(app);
initStockinfoRoute(app);
initBookmarksRoute(app);

app.post('/login', middlewares.login);
app.get('/logout', middlewares.logout);
app.post('/logout', middlewares.logout);

app.listen(PORT, function () {
  console.log('listening on port:', PORT, __dirname);
  if (env === 'docker-test') process.exit(0);
});
