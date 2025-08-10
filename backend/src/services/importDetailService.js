const db = require("../models/index");

const getAllImportDetails = async () => {
  return await db.ImportDetail.findAll({
    include: [
      { model: db.ImportReceipt, as: "importReceiptData" },
      { model: db.Product, as: "productData" },
    ],
  });
};

const getImportDetailById = async (id) => {
  return await db.ImportDetail.findByPk(id, {
    include: [
      { model: db.ImportReceipt, as: "importReceiptData" },
      { model: db.Product, as: "productData" },
    ],
  });
};

const createImportDetail = async (data) => {
  return await db.ImportDetail.create(data);
};

const updateImportDetail = async (id, data) => {
  return await db.ImportDetail.update(data, { where: { id } });
};

const deleteImportDetail = async (id) => {
  return await db.ImportDetail.destroy({ where: { id } });
};

module.exports = {
  getAllImportDetails,
  getImportDetailById,
  createImportDetail,
  updateImportDetail,
  deleteImportDetail,
};
