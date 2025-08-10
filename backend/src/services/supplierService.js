const db = require("../models/index");

const getAllSuppliers = async () => {
  return await db.Suppliers.findAll({
    include: [{ model: db.ImportReceipts, as: "importReceiptData" }],
  });
};

const getSupplierById = async (id) => {
  return await db.Suppliers.findByPk(id, {
    include: [{ model: db.ImportReceipts, as: "importReceiptData" }],
  });
};

const createSupplier = async (data) => {
  return await db.Suppliers.create(data);
};

const updateSupplier = async (id, data) => {
  return await db.Suppliers.update(data, { where: { id } });
};

const deleteSupplier = async (id) => {
  return await db.Suppliers.destroy({ where: { id } });
};

module.exports = {
  getAllSuppliers,
  getSupplierById,
  createSupplier,
  updateSupplier,
  deleteSupplier,
};
