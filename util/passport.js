const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
require("dotenv").config();

const user = {
  id: process.env.ADMIN_ID,
  username: process.env.ADMIN_USERNAME,
  password: process.env.ADMIN_PASSWORD_HASH,
};

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      if (username !== user.username) {
        return done(null, false, {
          message: "Wrong username",
        });
      }
      const matchPassword = await bcrypt.compare(password, user.password);
      return matchPassword
        ? done(null, user)
        : done(null, false, { message: "Incorrect password" });
    } catch (err) {
      done(err);
    }
  })
);

// configure Passport session serialization
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  if (id === user.id) {
    done(null, user);
  }
});
