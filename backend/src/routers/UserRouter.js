const express = require("express");
const router = express.Router();
const UserController = require("../controller/userController");
const { verifyToken } = require("../middleware/middleware");

router.post("/create-new-user", UserController.handleCreateNewUser);
router.get("/get-all-user", UserController.handleGetAllUsers);
router.post("/login-user", UserController.handleLoginUser);
router.put("/update-user", UserController.handleUpdateUser);
router.delete("/delete-user", UserController.handleDeleteUser);
router.post("/refresh-token", UserController.handleRefreshToken);
router.post("/logout", UserController.handleLogout);
module.exports = router;
