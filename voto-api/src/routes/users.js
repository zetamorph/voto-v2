const db = require("./../db/db");
const express = require("express");
const middleware = require("./../middleware/middleware")(db);
const passport = require("passport");
const userController = require("./../controllers/users");
const router = express.Router();

router.post("/signin", passport.authenticate("facebook-token"), userController.signIn);
router.get("/secret", 
  passport.authenticate("jwt"), (req, res) => {
    
  }
);

module.exports = router;