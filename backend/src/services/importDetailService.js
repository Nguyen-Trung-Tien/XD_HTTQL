const db = require("../models");

const getAllImportDetails = () => {
  return db.ImportDetails.findAll({
    include: [
      { model: db.ImportReceipts, as: "importReceiptData" },
      { model: db.Product, as: "productData" },
    ],
    order: [["id", "DESC"]],
  });
};

const getImportDetailById = async (id) => {
  const detail = await db.ImportDetails.findByPk(id, {
    include: [
      { model: db.ImportReceipts, as: "importReceiptData" },
      { model: db.Product, as: "productData" },
    ],
  });
  if (!detail) throw new Error(`Import detail with ID ${id} not found`);
  return detail;
};

const createImportDetail = async (data) => {
  const receipt = await db.ImportReceipts.findByPk(data.importId);
  if (!receipt) throw new Error(`Import receipt ${data.importId} not found`);

  const product = await db.Product.findByPk(data.productId);
  if (!product) throw new Error(`Product ${data.productId} not found`);

  data.quantity = Number(data.quantity);
  data.price = Number(data.price);

  if (!Number.isInteger(data.quantity) || data.quantity <= 0)
    throw new Error("Quantity must be a positive integer");

  if (data.price <= 0) throw new Error("Price must be greater than 0");

  return await db.ImportDetails.create(data);
};

const updateImportDetail = async (id, data) => {
  const detail = await db.ImportDetails.findByPk(id);
  if (!detail) throw new Error(`Import detail ${id} not found`);
  return await detail.update(data);
};

const deleteImportDetail = async (id) => {
  const deletedCount = await db.ImportDetails.destroy({ where: { id } });
  if (deletedCount === 0) throw new Error(`Import detail ${id} not found`);
  return { message: "Deleted successfully" };
};

module.exports = {
  getAllImportDetails,
  getImportDetailById,
  createImportDetail,
  updateImportDetail,
  deleteImportDetail,
};
