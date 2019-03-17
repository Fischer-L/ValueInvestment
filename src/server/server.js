const express = require('express');
const http = require('http');
const utils = require('../build/utils');
const { env, port, publicDir } = require('../build/config');
const axios = require('axios');
const stockProvider = require('./stockProvider')({ env, axios });

const PUBLIC_DIR = publicDir;
const PORT = process.env.PORT || port;

const app = express();

// Server static files
app.use(express.static(PUBLIC_DIR));

app.get("/stockdata/:id", async (req, res) => {
  const data = await stockProvider.get(req.params.id)
  res.json(data);
});

const httpSvr = http.Server(app);
httpSvr.listen(PORT, function(){
  console.log('listening on port:', PORT, __dirname);
});