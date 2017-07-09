const _ = require("lodash");
const config = require("config");
const db = require("./../db/db");
const jwt = require("jsonwebtoken");

module.exports = {

  getUser(req, res) {
    /* We don´t have to check if a user is on the request as passport-token 
    already returned a 401 if no user was found for the sent token */
    const publicUser = _.pick(req.user, "id", "username", "email", "avatarUrl");
    res.status(200).json(req.user);
  },

  getPublicUser(req, res) {
    // retrieve username, avatar, etc with req.params.userId
  },

  postUser(req,res) {
    /* Passport-Facebook-Token has already created the User Instance, 
    so we just have to create and send back a JWT */
    const token = jwt.sign({id: req.user.id}, config.get("authConfig.jwt.secret"));
    res.status(201).json({ token: "JWT " + token });
  },

  //getUser(req, res) {},
  deleteUser(req,res) {
    const userId = parseInt(req.params.userId);
    if (userId === req.user.id) {
      db.user.findById(userId)
      .then((user) => {
        return user.destroy();
      })
      .then((rowsDeleted) => {
        res.status(204).json({ success: "true" });
      })
      .catch((err) => {
        res.status(500).json({ err: "Internal Server Error" })
      });
    }
    else {
      res.status(403).json({ err: "Users can only delete themselves" });
    }
  },

}
   