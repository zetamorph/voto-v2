const db = require("./../db/db");
const express = require("express");
const middleware = require("./../middleware/middleware");
const passport = require("passport");
const pollController = require("./../controllers/polls");
const router = express.Router();

router.get("/polls", pollController.getPolls);
router.get("/polls/:pollId", pollController.getSinglePoll);
router.post("/polls", passport.authenticate("jwt"), pollController.postPoll);
router.delete("/polls/:pollId", passport.authenticate("jwt"), pollController.deletePoll);

module.exports = router;
