const customerService = require("../services/customerService");

let handleCreateCustomer = async (req, res) => {
  let response = await customerService.createCustomer(req.body);
  return res.status(200).json(response);
};

let handleGetAllCustomers = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const search = req.query.search || "";
  const status = req.query.status || "";
  const city = req.query.city || "";

  const result = await customerService.getAllCustomers(
    page,
    limit,
    search,
    status,
    city
  );
  res.status(200).json(result);
};

let handleUpdateCustomer = async (req, res) => {
  let data = req.body;
  let response = await customerService.updateCustomer(data);
  return res.status(200).json(response);
};

let handleDeleteCustomer = async (req, res) => {
  const id = req.query.id;
  if (!id) {
    return res.status(400).json({
      errCode: 1,
      message: "Missing required parameter: id",
    });
  }

  let response = await customerService.deleteCustomer(id);
  return res.status(200).json(response);
};

const deleteMultipleCustomers = async (req, res) => {
  const { ids } = req.body;

  if (!ids || !ids.length)
    return res.status(400).json({ errCode: 1, errMessage: "Missing ids" });

  try {
    await customerService.deleteMultipleCustomers(ids);
    res.json({ errCode: 0, message: "Delete success" });
  } catch (err) {
    console.error("Delete multiple error:", err);
    res.status(500).json({ errCode: 1, errMessage: err.message });
  }
};
module.exports = {
  handleCreateCustomer,
  handleGetAllCustomers,
  handleUpdateCustomer,
  handleDeleteCustomer,
  deleteMultipleCustomers,
};
