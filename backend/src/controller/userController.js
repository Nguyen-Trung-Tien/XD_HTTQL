const UserService = require("../services/UserService");

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

module.exports = { handleCreateNewUser, handleGetAllUsers, handleLoginUser };
