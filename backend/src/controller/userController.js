const UserService = require('../services/userService');

const handleCreateNewUser = async (req, res) => {
  const message = await UserService.createNewUser(req.body);
  return res.status(200).json(message);
};

module.exports = { handleCreateNewUser };
