_ = require("lodash");
const db = require("./../db/db");

module.exports = {

  getPolls(req,res) {
    const query = req.query;
    
    let sqlOptions = {};
    sqlOptions.include = {
      model: db.user,
      attributes: ["id", "username"]
    };
    sqlOptions.limit = query.limit || 20;
    sqlOptions.order = [["id","DESC"]];

    if(query.offset) {
      sqlOptions.offset = query.offset;
    }

    if(query.sort) {
      switch (query.sort) {
        case "popular": {
          console.log("popular");
        }
        case "random": {
          sqlOptions.order = "random()";
        }
      }
    }

    db.poll.findAll(sqlOptions)
    .then((polls) => {
      res.status(200).json(polls);
    })
    .catch((err) => {
      res.status(404).json({ error: "No polls not found" });
    });
  },

  getSinglePoll(req,res) {
    const pollId = parseInt(req.params.pollId, 10);
    let resObj;

    db.poll.findOne({
      where: { id: pollId }
    })
    .then((poll) => {
      resObj = poll.dataValues;
      return db.sequelize.query(
        "SELECT options.id AS optionId, options.title AS title,  " +
        "COUNT (votes.optionId) AS votes FROM options " +
        "LEFT JOIN votes ON options.id = votes.optionId " +
        "WHERE options.pollId = " + pollId + " GROUP BY options.id"
      );
    })
    .then((results) => {
      resObj.options = [];
      results[0].forEach((el, index, arr) => {
        resObj.options.push({ id: el.optionId, title: el.title, votes: el.votes });
      });
      res.status(200).json(resObj);
    })
    .catch((err) => {
      res.status(500).json({ err: "Internal Server Error" });
    });
  },

  postPoll(req,res) {
    db.poll.create({
      title: req.body.title,
      userId: req.user.id,
    })
    .then((createdPoll) => {
      res.status(201).json(createdPoll.dataValues);
    });
  },

  deletePoll(req,res) {
    
    const pollId = req.params.pollId;

    db.poll.findById(pollId)
    .then((poll) => {
      if(req.user.id !== poll.dataValues.userId) {
        return res.status(403).json({ err: "Only the creator can delete polls" });
      }
      return db.poll.destroy({
        where: {
          id: pollId
        }
      });
    })
    .then((rowsDeleted) => {
      res.status(204).end();
    })
    .catch((err) => {
      res.status(500).json({ err: "Internal Server Error" });
    });
  
  }

}
