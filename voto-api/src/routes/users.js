const db = require("./../db/db");
const express = require("express");
const middleware = require("./../middleware/middleware")(db);
const userController = require("./../controllers/users");
const router = express.Router();

router.post("/", userController.signUp);
router.post("/login", userController.signIn);
router.delete("/login", userController.logOut);
router.delete("/:userId", userController.deleteUser);

module.exports = router;