/* eslint-disable handle-callback-err */
require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');
const app = express();
const db = require('./lowdb');
const fetch = require('node-fetch');
const bcrypt = require('bcrypt');

app.use(staticMiddleware);
app.use(sessionMiddleware);
app.use(express.json());

const passport = require('./passport')(app);

app.post('/api/signup', (req, res) => {
  const { email, pwd, name, city } = req.body;
  bcrypt.hash(pwd, 10, (err, hash) => {
    const duplication = db
      .get('user')
      .find({ email })
      .value();
    if (duplication) {
      res.json({ err: 'Email already exist here' });
    } else {
      const users = db.get('user').value();
      const user = {
        id: users.length + 1,
        name: name.toLowerCase(),
        city: city.toLowerCase(),
        email: email.toLowerCase(),
        password: hash
      };
      db.get('user')
        .push(user)
        .write();
      res.json([user, true]);
    }
  });
});

app.post('/api/user', passport.authenticate('local'), (req, res) => {
  res.json([req.user, true]);
});

app.get('/api/user', (req, res) => {
  req.logout();
  req.session.save(err => {
    res.json([{}, false]);
  });
});

app.get('/api/home/user', (req, res) => {
  if (req.session.passport.user === req.user[0].email) {
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
  const city = req.body.city.toLowerCase();
  if (req.session.passport.user === req.user[0].email) {
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
