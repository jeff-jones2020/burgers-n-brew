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
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

app.use(staticMiddleware);
app.use(sessionMiddleware);
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user.email);
});
passport.deserializeUser((id, done) => {
  const users = db.get('user').value();
  const currentUser = users.filter((user, i) => {
    return user.email === id;
  });
  done(null, currentUser);
});

passport.use(
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    (username, password, done) => {
      const users = db.get('user').value();
      const currentUser = users.filter((user, i) => {
        return user.email === username;
      });
      if (currentUser.length === 0) {
        const errMsg = "there's no matched email";
        return done(null, false, {
          message: errMsg
        });
      }
      if (username === currentUser[0].email) {
        if (Number(password) === currentUser[0].password) {
          return done(null, currentUser[0]);
        } else {
          return done(null, false, {
            message: 'Incorrect password.'
          });
        }
      } else {
        return done(null, false, {
          message: 'Incorrect username.'
        });
      }
    }
  )
);

app.post('/api/user', passport.authenticate('local'), (req, res) => {
  res.json([req.user, true]);
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
