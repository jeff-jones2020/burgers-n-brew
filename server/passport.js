module.exports = app => {
  const passport = require('passport');
  const LocalStrategy = require('passport-local').Strategy;
  const db = require('./lowdb');

  app.use(passport.initialize());
  app.use(passport.session());

  module.exports = () => {
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
  };
  return passport;
};
