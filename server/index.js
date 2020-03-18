/* eslint-disable handle-callback-err */
require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const app = express();
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);

app.use(staticMiddleware);
app.use(express.json());

app.get('/api/city', (req, res) => {
  const data = db.get('city').value();
  res.json(data);
});
app.get('/api/user', (req, res) => {
  const data = db.get('user').value();
  res.json(data);
});

app.listen(process.env.PORT, () => {});
