const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
// const db = require('./lowdb');
const db = require('./sql-index');
const bcrypt = require('bcrypt');

module.exports = app => {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    done(null, user.email);
  });
  passport.deserializeUser((id, done) => {
    const sql = 'select * from "users";';
    db.query(sql, (err, result) => {
      if (err) {
        console.error(err);
      }
      const currentUser = result.rows.filter((user, i) => {
        return user.email === id;
      });
      done(null, currentUser);
    });
  });

  passport.use(
    new LocalStrategy(
      { usernameField: 'email', passwordField: 'password' },
      (username, password, done) => {
        const sql = 'select * from "users";';
        db.query(sql, (err, result) => {
          if (err) {
            console.error(err);
          }
          const userInfo = result.rows.filter((user, i) => {
            return user.email === username;
          });
          if (userInfo.length === 0) {
            const errMsg = "there's no matched email";
            return done(null, false, {
              message: errMsg
            });
          }
          if (username === userInfo[0].email) {
            bcrypt.compare(password, userInfo[0].password, (err, result) => {
              if (err) {
                throw err;
              } else if (result) {
                const user = {};
                user.id = userInfo[0].user_id;
                user.email = userInfo[0].email;
                user.name = userInfo[0].name;
                user.city = userInfo[0].default_city;
                return done(null, user);
              } else {
                return done(null, false, {
                  message: 'Incorrect password.'
                });
              }
            });
          } else {
            return done(null, false, {
              message: 'Incorrect username.'
            });
          }
        });
      }
    )
  );
  return passport;
};
