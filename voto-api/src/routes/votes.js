const db = require("./../db/db");
const express = require("express");
const voteController = require("./../controllers/votes");
const router = express.Router();

router.post("/options/:optionId/votes", voteController.postVote);

module.exports = router;