const db = require("./../db/db");
const express = require("express");
const optionController = require("./../controllers/options");
const passport = require("passport");
const router = express.Router();

router.get("/polls/:pollId/options", optionController.getOptions);
router.post("/polls/:pollId/options", passport.authenticate("jwt"), optionController.postOption);

module.exports = router;