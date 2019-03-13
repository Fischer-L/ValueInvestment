const express = require('express');
const http = require('http');
const utils = require('../build/utils');
const config = require('../build/config');

const { resolve } = utils;
const { port, publicDir } = config;

const PUBLIC_DIR = publicDir;
const PORT = process.env.PORT || port;

const app = express();
const httpSvr = http.Server(app);

// Server static files
app.use(express.static(PUBLIC_DIR));

app.get("/tmp/", (req, res) => {
  res.json({ tmp: 1234 });
});

httpSvr.listen(PORT, function(){
  console.log('listening on port:', PORT, __dirname);
});