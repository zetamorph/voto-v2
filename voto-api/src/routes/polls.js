const db = require("./../db/db");
const express = require("express");
const pollController = require("./../controllers/polls");
const router = express.Router();

router.get("/polls", pollController.getPolls);
router.get("/polls/:pollId", pollController.getSinglePoll);
router.post("/polls", pollController.postPoll);
router.delete("/polls/:pollId", pollController.deletePoll);

module.exports = router;
