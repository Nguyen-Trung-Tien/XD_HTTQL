const customerService = require("../services/customerService");

let handleCreateCustomer = async (req, res) => {
  let response = await customerService.createCustomer(req.body);
  return res.status(200).json(response);
};

let handleGetAllCustomers = async (req, res) => {
  let response = await customerService.getAllCustomers();
  return res.status(200).json(response);
};

let handleUpdateCustomer = async (req, res) => {
  let data = req.body;
  let response = await customerService.updateCustomer(data);
  return res.status(200).json(response);
};

let handleDeleteCustomer = async (req, res) => {
  let id = req.query.id;
  if (!id) {
    return res.status(400).json({
      errCode: 1,
      message: "Missing required parameter: id",
    });
  }

  let response = await customerService.deleteCustomer(id);
  return res.status(200).json(response);
};

module.exports = {
  handleCreateCustomer,
  handleGetAllCustomers,
  handleUpdateCustomer,
  handleDeleteCustomer,
};
