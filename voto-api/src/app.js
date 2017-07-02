const bodyParser = require("body-parser");
const config = require("config");
const cookieParser = require("cookie-parser");
const db = require("./db/db");
const env = process.env.NODE_ENV;
const express = require("express");
const expressSession = require("express-session");

const middleware = require("./middleware/middleware")(db);

const morgan = require("morgan");
const passport = require("passport");
const FacebookTokenStrategy = require("passport-facebook-token");
const FacebookStrategy = require("passport-facebook");
const path = require('path');

const routes = require("./routes");
const seed = require("./db/seed");
const Sequelize = require("sequelize");
const sqlite = require ("sqlite3");
const app = express();

let initCallback;

/* Configure Passport FacebookStrategy */

app.use(passport.initialize());
app.use(passport.session());

passport.use(new FacebookTokenStrategy(
  {
    clientID: config.get("authConfig.facebook.clientID"),
    clientSecret: config.get("authConfig.facebook.clientSecret"),
    profileFields: ["id", "displayName", "email"]
  },
  function(accessToken, refreshToken, profile, cb) {
    db.user.findOrCreate({
      where: { facebookID: profile.id },
      defaults: { facebookID: profile.id, username: profile.displayName, email: profile.email, facebookToken: accessToken }
    }, (err, user) => {
      cb(err, user);
    });
  }
));

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  db.user.findById(user.id, (err, user) => {
    cb(err, user);
  });
});

/* If this is set, the ip property of a request is the left-most entry in the X-Forwarded-For header, 
so setting this is necessary for getting a user`s ip when the server is running behind a reverse proxy */
app.set('trust proxy');
/* Disable logging when testing */
if(env !== "test") {
  app.use(morgan("combined"));
}
app.use(bodyParser.json());
app.use(cookieParser());
app.use(middleware.setHeaders);
app.use(routes);
app.use(expressSession({
  secret: config.get("appConfig.sessionSecret"),
  resave: true,
  saveUninitialized: true
}));

db.sequelize.sync({
  force: config.get("dbConfig.force")
})
.then(() => {
  seed(db, () => {
    app.listen(8000, () => {
      if(initCallback)  {
        initCallback();
      }
      if(env !== "test") {
        console.log("Voto API is running on port 8000");
      }
    });
  });
})
.catch((err) => {
  if(err) throw err;
});

module.exports = {
  app: app,
  init (cb) {
    initCallback = cb;
  }
}
