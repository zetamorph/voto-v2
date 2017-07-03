const db = require("./../db/db");
const express = require("express");
const middleware = require("./../middleware/middleware")(db);
const passport = require("passport");
const userController = require("./../controllers/users");
const router = express.Router();

router.post("/users", passport.authenticate("facebook-token"), userController.postUser);
//router.get("/users/:userId", passport.authenticate("jwt"), userController.getUser);
router.delete("/users/:userId", passport.authenticate("jwt"), userController.deleteUser);

module.exports = router;