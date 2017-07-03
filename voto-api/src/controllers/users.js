const _ = require("lodash");
const config = require("config");
const db = require("./../db/db");
const jwt = require("jsonwebtoken");

module.exports = {

  signIn(req,res) {
    console.log("from userCOntroller");
    console.log(req.user.id);
    const token = jwt.sign({id: req.user.id}, config.get("authConfig.jwt.secret"));
    console.log(token);
    res.end();
  },
/*
  signIn(req,res) {
    const body = _.pick(req.body, "email", "password");
    let userInstance = {};
    let token;
    let pollsVotedOn;

    db.user.authenticate(body)
    .then((user) => {
      token = user.generateToken("authentication");
      userInstance = user;
      return db.vote.findAll({
        attributes: [],
        where: {
          userId: userInstance.get("id")
        },
        include: {
          model: db.option,
          attributes: ["pollId"],
        },
      });
    })
    .then((result) => {
      pollsVotedOn = result.map((el, ind, arr) => {
        return el.option.pollId;
      });
      return db.token.create({
        token: token
      });
    })
    .then((tokenInstance) => {
      let userObj = userInstance.toPublicJSON();
      userObj.pollsVotedOn = pollsVotedOn;
      res.header("Auth", tokenInstance.get("token")).json(userObj);
    })
    .catch((err) => {
      res.status(401).json({ err: "Wrong username or password" });
    });
  },

  logOut(req,res) {
    req.token.destroy()
    .then(() => {
      res.status(204).end();
    })
    .catch((err) => {
      res.status(500).end();
    });
  },

  deleteUser(req,res) {
    req.user.destroy()
    .then(() => {
      res.status(204).end();
    })
    .catch((err) => {
      res.status(500).end();
    });
  }
*/
}
   