_ = require("lodash");
const db = require("./../db/db");

module.exports = {

  getPolls(req,res) {

    const query = req.query;
    let sqlOptions = {};
    
    sqlOptions.include = [  
      {
        model: db.user,
        attributes: ["id", "username"]
      },
      { model: db.option, 
        attributes: [
          [db.sequelize.literal(`(SELECT COUNT(votes.id) FROM votes WHERE votes.optionId = options.id)`), "votesForOption"]
        ],
        include: {
          model: db.vote,
          attributes: []
        }
      }
    ];
    sqlOptions.limit = query.limit || 20;
    sqlOptions.order = [["id","DESC"]];

    if (query.offset) {
      sqlOptions.offset = query.offset;
    }

    if (query.sort) {
      switch (query.sort) {
        case "popular": {
          //TODO find polls with the most votes and return them
          console.log("popular");
        }
        case "random": {
          sqlOptions.order = "random()";
        }
      }
    }

    if (query.userId) {
      sqlOptions.where = { userId: query.userId };
    }

    db.poll.findAll(sqlOptions)
    .then((polls) => {
      if (!polls) {
        res.status(404).json({ error: "No polls found." });
      }
      let pollData = polls.map(poll => poll.get({plain: true}));    
      pollData.forEach((el, idx, arr) => {
        el.totalVotes = el.options.reduce((acc, val) => {
          return acc + val.votesForOption;
        }, 0);
        delete el.options;
      });
      res.status(200).json(pollData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Something went wrong. Please try again." });
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
      if (!results[0]) {
        res.status(404).json({ error: "Poll not found." })
      }
      resObj.options = [];
      results[0].forEach((el, index, arr) => {
        resObj.options.push({ id: el.optionId, title: el.title, votes: el.votes });
      });
      res.status(200).json(resObj);
    })
    .catch((err) => {
      res.status(500).json({ error: "Something went wrong. Please try again." });
    });
  },

  postPoll(req,res) {
    db.poll.create({
      title: req.body.title,
      userId: req.user.id,
    })
    .then((createdPoll) => {
      res.status(201).json(createdPoll.dataValues);
    })
    .catch((err) => {
      res.status(500).json({ error: "Something went wrong. Please try again." });
    })
  },

  deletePoll(req,res) {
    
    const pollId = req.params.pollId;

    db.poll.findById(pollId)
    .then((poll) => {
      if (req.user.id !== poll.dataValues.userId) {
        return res.status(403).json({ error: "Only the creator can delete polls" });
      }
      return db.poll.destroy({
        where: {
          id: pollId
        }
      });
    })
    .then((rowsDeleted) => {
      res.status(204).json({ success: "true" });
    })
    .catch((err) => {
      res.status(500).json({ error: "Something went wrong. Please try again." });
    });
  
  }

}
