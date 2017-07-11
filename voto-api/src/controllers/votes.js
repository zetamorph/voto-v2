const db = require("./../db/db");
const _ = require("lodash");

module.exports = {
  /* This method checks if the user with this IP already voted on the poll the option is for. 
  This allows users to vote multiple days in a row of course, but it enables users to vote 
  without logging in, making the service more accessible. */
  postVote(req,res) {
    const voteData = {
      ip: req.ip,
      optionId: req.params.optionId
    };
    let pollId;

    db.option.findById(voteData.optionId)
    .then((option) => {
      pollId = option.dataValues.pollId;
      return db.option.findAll({
        where: {
          pollId: pollId
        }
      });
    })
    .then((options) => {
      const optionIds = [];
      options.forEach((el, index, arr) => {
        optionIds.push(el.dataValues.id);
      });
      return db.vote.findOrCreate({
        where: {
          ip: voteData.ip,
          optionId: optionIds
        }, 
        defaults: {
          ip: voteData.ip,
          optionId: voteData.optionId
        }
      });
    })
    .spread((vote, created) => {
      if (created) {
        res.status(201).json({ success: "true" });
      } else {
        res.status(403).json({ error: "You already voted on this poll." });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "Something went wrong. Please try again." });
    });
  }
}
    