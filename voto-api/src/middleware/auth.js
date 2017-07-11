const passport = require("passport");  
const passportJWT = require("passport-jwt");  
const config = require("config");
const db = require("./../db/db");    
const ExtractJWT = passportJWT.ExtractJwt;  
const JWTStrategy = passportJWT.Strategy;  
const FacebookTokenStrategy = require("passport-facebook-token");

passport.use(new FacebookTokenStrategy(
  {
    clientID: config.get("authConfig.facebook.clientID"),
    clientSecret: config.get("authConfig.facebook.clientSecret"),
    profileFields: ["id", "displayName", "email"]
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(accessToken);
    db.user.find({ where: { facebookID: profile.id } })
    .then((user) => {
      if (user) {
        cb(null, user);
      }
      else {
        db.user.create({
          facebookID: profile.id, 
          username: profile.displayName, 
          email: profile.email, 
          facebookToken: accessToken, 
          facebookRefreshToken: refreshToken
        })
        .then((user) => {
          console.log("user created");
          cb(null, user);
        })
        .catch(err => { throw(err) })
      }
    })
    /* Since providing this error to the Client might leak some implementation details, we just log it */
    .catch(console.error); 
  }
));

passport.use(new JWTStrategy({
  secretOrKey: config.get("authConfig.jwt.secret"),
  jwtFromRequest: ExtractJWT.fromAuthHeader(),
}, (jwtPayload, done) => {
  db.user.find({ where: { id: jwtPayload.id}})
  .then((user) => {
    if (user) {
      done(null, user);
    }
    else {
      done(null, false);
    }
  }).catch(console.error);
}));

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  db.user.findById(user.id, (err, user) => {
    cb(err, user);
  });
});

module.exports = passport;
