const UserService = require("../services/UserService");
const db = require("../models/index");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const handleCreateNewUser = async (req, res) => {
  const message = await UserService.createNewUser(req.body);
  return res.status(200).json(message);
};

const handleLoginUser = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing inputs parameter!",
    });
  }

  let userData = await UserService.handleLoginUser(email, password);
  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMessage,
    user: userData.user ? userData.user : {},
  });
};

const handleGetAllUsers = async (req, res) => {
  let id = req.query.id;
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameter!",
      users: [],
    });
  }
  let users = await UserService.getAllUsers(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "OK",
    users,
  });
};

const handleUpdateUser = async (req, res) => {
  try {
    let data = req.body;
    let message = await UserService.UpdateUserData(data);
    return res.status(200).json(message);
  } catch (e) {
    console.log("Error", e);
  }
};

const handleDeleteUser = async (req, res) => {
  try {
    if (!req.body.id) {
      return res.status(200).json({
        errCode: 1,
        errMessage: "Missing required parameter!",
      });
    }
    let message = await UserService.DeleteUserData(req.body.id);
    return res.status(200).json(message);
  } catch (e) {
    console.log("User not found!", e);
  }
};

const handleRefreshToken = async (req, res) => {
  try {
    const refresh_token = req.body.refresh_token;
    if (!refresh_token)
      return res.status(401).json({ message: "Missing token" });

    const user = await db.User.findOne({
      where: { refresh_token: refresh_token },
    });

    if (!user) return res.status(403).json({ message: "Token invalid" });

    jwt.verify(refresh_token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.status(403).json({ message: "Token expired" });

      const newAccessToken = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "15m" }
      );

      return res.status(200).json({
        access_token: newAccessToken,
      });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const handleLogout = async (req, res) => {
  try {
    const { refresh_token } = req.body;

    if (!refresh_token) {
      return res.status(400).json({ message: "Missing refresh_token" });
    }

    await db.User.update({ refresh_token: null }, { where: { refresh_token } });

    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

module.exports = {
  handleCreateNewUser,
  handleGetAllUsers,
  handleLoginUser,
  handleUpdateUser,
  handleDeleteUser,
  handleRefreshToken,
  handleLogout,
};
