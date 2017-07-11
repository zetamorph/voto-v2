const db = require("./../db/db");
const _ = require("lodash");

module.exports = {

  getOptions(req, res) {
    const pollId = parseInt(req.params.pollId);

    db.sequelize.query(`
      SELECT options.*, 
      (
        SELECT COUNT(*) 
        FROM votes WHERE votes.optionId = options.id
      ) 
      AS voteCount
      FROM options LEFT JOIN votes 
      ON options.id = votes.optionId  
      WHERE options.pollId = ${pollId} 
      GROUP BY options.id`
    )
    .then((options) => {
      res.status(200).json(options[0]);
    })
    .catch((err) => {
      res.status(500).json({ error: "Something went wrong. Please try again." });
    });
  },

  postOption(req, res) {
    const pollId = parseInt(req.params.pollId);
    const userId = req.user.id;

    db.poll.findById(pollId)
    .then((pollInstance) => {
      if (!pollInstance) throw new Error();
      req.poll = pollInstance.dataValues;
      return db.option.findAndCountAll({
        where: { pollId: pollId, userId: userId },
      });
    })
    .then((result) => {
      /* Owners of a poll can create up to 5 options, but regular users 
      can only create a single new option */
      if (result.count === 0 || (req.poll.userId === req.user.id && result.count < 5)) {
        db.option.create({ title: req.body.title, pollId: pollId, userId: userId })
        .then((option) => {
          res.status(201).json(option.dataValues);
        })
        .catch((err) => { throw(err) });
      }
      else {
        res.status(403).json({ error: "You already created too many options" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "Something went wrong. Please try again." });
    });
  }
}