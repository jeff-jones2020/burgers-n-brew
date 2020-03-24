/* eslint-disable handle-callback-err */
require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');
const app = express();
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);
const fetch = require('node-fetch');

app.use(staticMiddleware);
app.use(sessionMiddleware);
app.use(express.json());

app.post('/api/user', (req, res) => {
  const data = db.get('user').value();
  if (req.body.email === data.email && req.body.pwd === data.password) {
    req.session.is_signined = true;
    req.session.name = data.name;
    res.send('success');
  } else {
    res.send('who?');
  }
});

app.put('/api/user/:id', (req, res) => {
  const id = Number(req.params.id);
  const city = req.body.city.toUpperCase();
  db.get('user')
    .find({ id })
    .assign({ city })
    .write();
  const data = db
    .get('user')
    .find({ id })
    .value();
  res.json(data);
});

app.get('/api/user', (req, res) => {
  const data = db.get('user').value();
  res.json(data);
});

app.get('/api/yelp/businesses/search/:query', (req, res) => {
  const queryUrl =
    'https://api.yelp.com/v3/businesses/search?' + req.params.query;
  fetch(queryUrl, {
    method: 'GET',
    headers: {
      Authorization: process.env.KEY
    }
  })
    .then(response => response.json())
    .then(data => {
      res.status(200).json(data);
    });
});

app.get('/api/yelp/businesses/:id', (req, res) => {
  const queryUrl = 'https://api.yelp.com/v3/businesses/' + req.params.id;
  fetch(queryUrl, {
    method: 'GET',
    headers: {
      Authorization: process.env.KEY
    }
  })
    .then(response => response.json())
    .then(data => {
      res.status(200).json(data);
    });
});

app.listen(process.env.PORT, () => {});
