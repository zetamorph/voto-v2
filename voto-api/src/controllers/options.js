const db = require("./../db/db");
const _ = require("lodash");

module.exports = {

  getOptions(req, res) {
    const pollId = parseInt(req.params.pollId);

    db.option.findAll({
      where: { pollId: pollId },
      attributes: { 
        include: [[db.sequelize.fn("COUNT", "votes.id"), "voteCount"]],
     },
      include: {
        model: db.vote,
        attributes: []
      },
      group: [db.sequelize.col("option.id")]
    })
    .then((options) => {
      res.status(200).json(options);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err: "Internal Server Error" });
    });
  },

  postOption(req, res) {
    const pollId = parseInt(req.params.pollId);
    const userId = req.user.id;

    db.poll.findById(pollId)
    .then((pollInstance) => {
      if(!pollInstance) throw new Error();
      req.poll = pollInstance.dataValues;
      return db.option.findAndCountAll({
        where: { pollId: pollId, userId: userId },
      });
    })
    .then((result) => {
      console.log(result);
      /* Owners of a poll can create up to 5 options, but regular users 
      can only create a single new option */
      if(result.count === 0 || (req.poll.userId === req.user.id && result.count < 5)) {
        db.option.create({ title: req.body.title, pollId: pollId, userId: userId })
        .then((option) => {
          res.status(201).json(option.dataValues);
        })
        .catch((err) => {
          throw(err);
        });
      }
      else {
        res.status(403).json({ err: "You already created too many options" });
      }
    })
    .catch((err) => {
      res.status(500).json({ err: "Internal Server Error" });
    });
  }
}