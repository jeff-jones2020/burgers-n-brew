/* eslint-disable handle-callback-err */
require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');
const app = express();
const fetch = require('node-fetch');
const bcrypt = require('bcrypt');

app.use(staticMiddleware);
app.use(sessionMiddleware);
app.use(express.json());

const pg = require('pg');
const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL
});
module.exports = db;

const passport = require('./passport')(app);

app.get('/api/health-check', (req, res, next) => {
  try {
    db.getState();
    res.json({ message: 'Connected to lowdb successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to connect to database' });
  }

});

app.post('/api/signup', (req, res) => {
  const { email, pwd, name, city } = req.body;
  bcrypt.hash(pwd, 10, (err, hash) => {
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
                    values ($1, $2, $3, $4)
                    returning *;`;
      db.query(sql, [email, hash, name, city], (err, result) => {
        if (err) {
          console.error(err);
        }
        const user = {};
        user.id = result.rows[0].user_id;
        user.email = result.rows[0].email;
        user.name = result.rows[0].name;
        user.city = result.rows[0].default_city;
        res.json([user, true]);
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

app.put('/api/home/user/:id', (req, res) => {
  const id = Number(req.params.id);
  const city = req.body.city;
  if (req.session.passport.user === req.user[0].email) {
    const sql =
      'update "users" set "default_city" = $1 where "user_id" = $2 returning *;';
    db.query(sql, [city, id], (err, result) => {
      if (err) {
        console.error(err);
      }
      const user = {};
      user.id = result.rows[0].user_id;
      user.email = result.rows[0].email;
      user.name = result.rows[0].name;
      user.city = result.rows[0].default_city;
      res.json(user);
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

app.get('/api/has-reviewed/:userId/:yelpId', (req, res) => {
  const { yelpId } = req.params;
  const userId = parseFloat(req.params.userId);
  if (!userId || userId < 1 || (userId % 1 > 0)) {
    return res.status(400).json({ message: 'Invalid userId: userId must be a positive integer' });
  } else if (!yelpId) {
    return res.status(400).json({ message: 'Request must include a yelpId' });
  }

  checkUserReviews(yelpId, userId)
    .then(result => {
      return res.status(200).json({ hasReviewed: false });
    })
    .catch(err => res.status(200).json({ hasReviewed: true }));

});

app.get('/api/suggestions/:yelpId/:table', (req, res) => {
  const { yelpId, table } = req.params;
  if (table !== 'brew_suggestions' && table !== 'dish_suggestions') return res.status(404).send();

  const sql = `
    SELECT * FROM ${table}
    WHERE yelp_id = $1
    ORDER BY count DESC
    LIMIT 3
  `;

  const verifyYelpIdSql = `
    SELECT * FROM restaurants
    WHERE yelp_id = $1
  `;

  db.query(sql, [yelpId])
    .then(result => {
      if (result.rows.length === 0) {
        return (
          db.query(verifyYelpIdSql, [yelpId])
            .then(result => {
              if (result.rows.length === 0) {
                return res.status(404).send(`No restaurant found with yelp ID ${yelpId}.`);
              }
              return res.status(200).send([]);
            })
        );
      }
      return res.status(200).send(result.rows);
    })
    .catch(err => {
      console.error(err);
      res.send({ error: err });
    });

});

app.post('/api/reviews', (req, res) => {
  const { body } = req;
  const { yelpId, yelpName, reviewText, suggestedDish, suggestedBrew } = body;
  const userId = parseInt(body.userId, 10);
  const rating = parseFloat(body.rating);
  if (!userId || userId < 1 || (userId !== parseFloat(body.userId))) {
    return res.status(400).json({ message: 'Invalid userId: userId must be a positive integer' });
  } else if (!rating || rating < 1 || rating > 5) {
    return res.status(400).json({ message: 'Invalid rating: rating must be a positive decimal between 1 and 5' });
  } else if (!yelpId) {
    return res.status(400).json({ message: 'Request must include a yelpId' });
  } else if (!yelpName) {
    return res.status(400).json({ message: 'Request must include a yelpName' });
  }

  const postRestaurantParams = [yelpId, yelpName, rating];
  const postRestaurantSql = `
    INSERT INTO restaurants (yelp_id, name, rating)
      VALUES ($1, $2, $3)
  `;

  const reviewParams = [userId, yelpId, rating, reviewText, suggestedDish, suggestedBrew];
  const reviewSql = `
    INSERT INTO reviews (user_id, yelp_id, rating, review_text, suggested_dish, suggested_brew)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
  `;

  const getRatingsSql = `
    SELECT rating FROM reviews
      WHERE yelp_id = $1
  `;
  const updateRatingSql = `
    UPDATE restaurants
      SET rating = $1
      WHERE yelp_id = $2
  `;

  checkUserReviews(yelpId, userId)
    .then(result => {
      postRestaurant();
    })
    .catch(err => res.status(403).json({ error: err.message }));

  function postRestaurant() {
    db.query(postRestaurantSql, postRestaurantParams)
      .then(result => postReview())
      .catch(err => {
        if (err.code === '23505') {
          postReview();
        } else {
          return res.status(500).json({ err: err.detail });
        }
      });
  }

  function postReview() {
    db.query(reviewSql, reviewParams)
      .then(result => {
        const review = result.rows[0];
        if (!review) {
          return res.status(500).json({ message: 'Nothing returned from psql' });
        } else {
          if (suggestedDish) postDish(yelpId, suggestedDish);
          if (suggestedBrew) postBrew(yelpId, suggestedBrew);
          updateAverageRating();
          return res.json(review);
        }
      })
      .catch(err => {
        console.error(err);
        let status;
        if (err.code === '23503') status = 400;
        else status = 500;
        res.status(status).json({ error: err.detail });
      });
  }

  function updateAverageRating() {
    db.query(getRatingsSql, [yelpId])
      .then(result => {
        const reducer = (sum, currentValue) => sum + parseInt(currentValue.rating, 10);
        const sum = result.rows.reduce(reducer, 0);
        return (sum / result.rows.length);
      })
      .then(average => {
        db.query(updateRatingSql, [average, yelpId]);
      });
  }
});

function checkUserReviews(yelpId, userId) {
  const uniqueCheckParams = [yelpId, userId];
  const uniqueCheckSql = `
    SELECT * FROM reviews
      WHERE (yelp_id = $1 AND user_id = $2)
  `;

  return (
    db.query(uniqueCheckSql, uniqueCheckParams)
      .then(result => {
        if (result.rows.length !== 0) {
          throw new Error(`User with id ${userId} has already left a review for yelp ID ${yelpId}`);
        } else {
          return result;
        }
      })
  );
}

function postDish(yelpId, suggestion) {
  const params = [yelpId, suggestion];
  const findDuplicateSql = `
    SELECT * FROM dish_suggestions
      WHERE (yelp_id=$1 AND name=$2)
  `;
  const incrementSql = `
    UPDATE dish_suggestions
      SET count = count + 1
      WHERE (yelp_id=$1 AND name=$2)
  `;
  const postNewSql = `
    INSERT INTO dish_suggestions (yelp_id, name, count)
      VALUES ($1, $2, 1)
  `;

  db.query(findDuplicateSql, params)
    .then(result => {
      const dish = result.rows[0];
      if (!dish) {
        db.query(postNewSql, params);
      } else {
        db.query(incrementSql, params);
      }
    })
    .catch(err => console.error(err));
}

function postBrew(yelpId, suggestion) {
  const params = [yelpId, suggestion];
  const findDuplicateSql = `
    SELECT * FROM brew_suggestions
      WHERE (yelp_id=$1 AND name=$2)
  `;
  const incrementSql = `
    UPDATE brew_suggestions
      SET count = count + 1
      WHERE (yelp_id=$1 AND name=$2)
  `;
  const postNewSql = `
    INSERT INTO brew_suggestions (yelp_id, name, count)
      VALUES ($1, $2, 1)
  `;

  db.query(findDuplicateSql, params)
    .then(result => {
      const brew = result.rows[0];
      if (!brew) {
        db.query(postNewSql, params);
      } else {
        db.query(incrementSql, params);
      }
    })
    .catch(err => console.error(err));
}

// eslint-disable-next-line no-console
app.listen(process.env.PORT, () => { console.log(`App listening on port ${process.env.PORT}`); });
