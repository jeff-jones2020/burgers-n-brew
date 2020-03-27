/* eslint-disable handle-callback-err */
require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');
const app = express();
const lowdb = require('./lowdb');
const fetch = require('node-fetch');
const bcrypt = require('bcrypt');

app.use(staticMiddleware);
app.use(sessionMiddleware);
app.use(express.json());

// For PostgreSQL ********
const pg = require('pg');
const db = new pg.Pool({
  connectionString: 'postgres://dev:lfz@localhost/bnb'
});
// For PostgreSQL ********

const passport = require('./passport')(app);

app.post('/api/signup', (req, res) => {
  const { email, pwd, name, city } = req.body;
  bcrypt.hash(pwd, 10, (err, hash) => {
    const duplication = lowdb
      .get('user')
      .find({ email })
      .value();
    if (duplication) {
      res.json({ err: 'Email already exist here' });
    } else {
      const users = lowdb.get('user').value();
      const user = {
        id: users.length + 1,
        name: name.toLowerCase(),
        city: city.toLowerCase(),
        email: email.toLowerCase(),
        password: hash
      };
      lowdb.get('user')
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
    const data = lowdb.get('user').value();
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
    lowdb.get('user')
      .find({ id })
      .assign({ city })
      .write();
    const data = lowdb
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

app.post('/api/reviews', (req, res) => {
  const { body } = req;
  const { yelpId, reviewText } = body;
  const userId = parseInt(body.userId, 10);
  const rating = parseFloat(body.rating);
  if (!userId || userId < 1 || (userId !== parseFloat(body.userId))) {
    res.status(400).json({ message: 'Invalid userId: userId must be a positive integer' });
    return;
  } else if (!rating || rating < 1 || rating > 5) {
    res.status(400).json({ message: 'Invalid rating: rating must be a positive decimal between 1 and 5' });
    return;
  }

  const params = [userId, yelpId, rating, reviewText];
  const sql = `
    INSERT INTO reviews (user_id, yelp_id, rating, review_text)
      VALUES ($1, $2, $3, $4)
      RETURNING *
  `;

  db.query(sql, params)
    .then(result => {
      const review = result.rows[0];
      if (!review) {
        res.status(500).json({ message: 'Nothing returned from psql' });

      } else {
        res.json(review);

      }
    })
    .catch(err => {
      console.error(err);
      let status;
      if (err.code === '23503') status = 400;
      res.status(status).json({ error: err.detail });
    });

});

// eslint-disable-next-line no-console
app.listen(process.env.PORT, () => { console.log(`App listening on port ${process.env.port}`); });
