const express = require("express");
const router = express.Router();
const UserController = require("../controller/UserController");

router.post("/create-new-user", UserController.handleCreateNewUser);
module.exports = router;
