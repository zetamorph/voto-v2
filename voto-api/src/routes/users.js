const db = require("./../db/db");
const express = require("express");
const middleware = require("./../middleware/middleware")(db);
const userController = require("./../controllers/users");
const router = express.Router();

router.post("/", userController.signUp);
router.post("/login", userController.signIn);
router.delete("/login", middleware.requireAuth, userController.logOut);
router.delete("/:userId", middleware.requireAuth, userController.deleteUser);

module.exports = router;