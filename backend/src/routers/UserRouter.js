const express = require("express");
const router = express.Router();
const UserController = require("../controller/userController");

router.post("/create-new-user", UserController.handleCreateNewUser);
router.get("/get-all-user", UserController.handleGetAllUsers);
router.post("/login-user", UserController.handleLoginUser);

module.exports = router;
