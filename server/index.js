/* eslint-disable handle-callback-err */
require('dotenv/config');
const express = require('express');
// const db = require('./database');
const staticMiddleware = require('./static-middleware');
// const sessionMiddleware = require('./session-middleware');
const app = express();
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);

app.use(staticMiddleware);
// app.use(sessionMiddleware);
app.use(express.json());

app.get('/api', (req, res) => {
  const data = db.get('city').value();
  res.json(data);
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-'select \'successfully connected\' as "message"'rt', process.env.PORT);
});
