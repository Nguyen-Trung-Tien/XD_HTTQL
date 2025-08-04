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
  let { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      errCode: 1,
      message: "Missing inputs parameter!",
    });
  }

  let userData = await UserService.handleLoginUser(email, password);

  if (userData.errCode !== 0) {
    return res.status(400).json({
      errCode: userData.errCode,
      message: userData.errMessage,
    });
  }

  const access_token = jwt.sign(
    {
      id: userData.user.id,
      isAdmin: userData.user.role === "admin",
    },
    process.env.JWT_SECRET,
    { expiresIn: "30s" }
  );

  const refresh_token = jwt.sign(
    {
      id: userData.user.id,
      isAdmin: userData.user.role === "admin",
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  await db.User.update(
    { refresh_token: refresh_token },
    { where: { id: userData.user.id } }
  );

  res.cookie("refresh_token", refresh_token, {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res.status(200).json({
    errCode: 0,
    message: "Login successful",
    user: userData.user,
    access_token: access_token,
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
    const { refresh_token } = req.body;
    if (!refresh_token) {
      return res.status(401).json({ message: "Missing refresh token" });
    }

    const user = await db.User.findOne({ where: { refresh_token } });
    if (!user) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const decoded = jwt.verify(refresh_token, process.env.JWT_SECRET);
    if (!decoded || user.id !== decoded.id) {
      return res.status(403).json({ message: "Token invalid or mismatched" });
    }

    const newAccessToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    const newRefreshToken = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    await db.User.update(
      { refresh_token: newRefreshToken },
      { where: { id: user.id } }
    );
    return res.status(200).json({
      access_token: newAccessToken,
      refresh_token: newRefreshToken,
    });
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(403).json({ message: "Refresh token expired" });
    }
    console.error("Error in handleRefreshToken:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const handleLogout = async (req, res) => {
  try {
    const refresh_token = req.cookies.refresh_token;

    if (!refresh_token) {
      return res
        .status(400)
        .json({ message: "Missing refresh_token in cookie" });
    }

    const user = await db.User.findOne({ where: { refresh_token } });

    if (!user) {
      return res
        .status(404)
        .json({ message: "Token không hợp lệ hoặc user không tồn tại" });
    }

    // 1. Xóa refresh_token trong database
    const result = await db.User.update(
      { refresh_token: null },
      { where: { id: user.id } }
    );

    if (result[0] === 1) {
      // 2. Nếu thành công thì xóa cookie
      res.clearCookie("refresh_token", {
        httpOnly: true,
        sameSite: "Lax",
        secure: false,
      });

      return res.status(200).json({ message: "Logout successful" });
    } else {
      return res
        .status(500)
        .json({ message: "Failed to remove token from DB" });
    }
  } catch (error) {
    console.error(error);
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
