const express = require("express");
const optionRoutes = require("./options");
const pollRoutes = require("./polls");
const voteRoutes = require("./votes");
const userRoutes = require("./users");
const router = express.Router();

router.use(pollRoutes, voteRoutes, userRoutes);
//router.use("/users", userRoutes);

module.exports = router;
