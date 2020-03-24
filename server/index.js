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
  const users = db.get('user').value();
  const currentUser = users.filter((user, i) => {
    return user.email === req.body.email;
  });
  if (currentUser.length === 0) {
    const errMsg = "there's no matched email";
    return res.send(errMsg);
  }

  if (
    currentUser[0].email === req.body.email &&
    Number(req.body.password) === currentUser[0].password
  ) {
    req.session.isSignedIn = true;
    req.session.name = currentUser[0].name;
    req.session.save(() => {
      res.json([currentUser[0], true]);
    });
  } else {
    const errMsg = 'please check email or password';
    res.status(404).send(errMsg);
  }
});

app.get('/api/user', (req, res) => {
  req.session.destroy(err => {
    res.json([{}, false]);
  });
});

app.get('/api/home/user', (req, res) => {
  if (req.session.isSignedIn) {
    const data = db.get('user').value();
    const newUser = data.filter((user, i) => {
      return user.name === req.session.name;
    });
    res.json(newUser[0]);
  } else {
    return false;
  }
});

app.put('/api/home/user/:id', (req, res) => {
  const id = Number(req.params.id);
  const city = req.body.city.toUpperCase();
  if (req.session.isSignedIn) {
    db.get('user')
      .find({ id })
      .assign({ city })
      .write();
    const data = db
      .get('user')
      .find({ id })
      .value();
    res.json(data);
  } else {
    return false;
  }
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
