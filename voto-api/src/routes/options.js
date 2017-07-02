const db = require("./../db/db");
const express = require("express");
const optionController = require("./../controllers/options");
const router = express.Router();

router.post("/polls/:pollId/options", optionController.postSingleOption);

module.exports = router;