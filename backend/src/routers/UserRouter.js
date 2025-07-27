const express = require("express");
const router = express.Router();
const UserController = require("../controller/userController.js");

router.post("/create-new-user", UserController.handleCreateNewUser);
module.exports = router;
