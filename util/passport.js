const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
require("dotenv").config();

const user = {
  id: process.env.ADMIN_ID,
  username: process.env.ADMIN_USERNAME,
  password: process.env.ADMIN_PASSWORD_HASH,
};

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SESSION_SECRET_KEY,
};

passport.use(
  new JwtStrategy(options, (jwtPayload, done) => {
    if (jwtPayload.sub === user.id) {
      return done(null, user || false);
    } else {
      return done(err, false);
    }
  })
);

module.exports = passport;
