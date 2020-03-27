/* eslint-disable handle-callback-err */
require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');
const app = express();
// const db = require('./lowdb');
const fetch = require('node-fetch');
const bcrypt = require('bcrypt');
const db = require('./sql-index');

app.use(staticMiddleware);
app.use(sessionMiddleware);
app.use(express.json());

const passport = require('./passport')(app);

app.post('/api/signup', (req, res) => {
  const { email, password, name, city } = req.body;
  bcrypt.hash(password, 10, (err, hash) => {
    const sql = 'select "email" from "users";';
    db.query(sql, (err, result) => {
      if (err) {
        console.error(err);
      }
      const duplication = result.rows.filter((user, i) => {
        return user.email === email;
      });
      if (duplication.length !== 0) {
        res.json({ err: 'Email already exist here' });
      }
      const sql = `insert into "users" ("email", "password", "name", "default_city")
                    values ('${email}', '${hash}', '${name}', '${city}')
                    returning *;`;
      db.query(sql, (err, result) => {
        if (err) {
          console.error(err);
        }
        res.json([result.rows[0], true]);
      });
    });
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
    const sql = 'select * from "users"';
    db.query(sql, (err, result) => {
      if (err) {
        console.error(err);
      }
      const newUser = result.rows.filter((user, i) => {
        return user.name === req.session.name;
      });
      res.json(newUser[0]);
    });
  } else {
    return false;
  }
});

/*
update "products"
   set "price" = 100
 where "productId" = 24;
*/

app.put('/api/home/user/:id', (req, res) => {
  const id = Number(req.params.id);
  const city = req.body.city;
  if (req.session.passport.user === req.user[0].email) {
    const sql = `update "users" set "default_city" = '${city}' where "user_id" = ${id} returning *;`;
    db.query(sql, (err, result) => {
      if (err) {
        console.error(err);
      }
      res.json(result.rows[0]);
    });
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
