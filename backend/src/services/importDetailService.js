const db = require("../models/index");

const getAllImportDetails = async () => {
  return await db.ImportDetails.findAll({
    include: [
      { model: db.ImportReceipts, as: "importReceiptData" },
      { model: db.Product, as: "productData" },
    ],
  });
};

const getImportDetailById = async (id) => {
  return await db.ImportDetails.findByPk(id, {
    include: [
      { model: db.ImportReceipts, as: "importReceiptData" },
      { model: db.Product, as: "productData" },
    ],
  });
};

const createImportDetail = async (data) => {
  return await db.ImportDetails.create(data);
};

const updateImportDetail = async (id, data) => {
  return await db.ImportDetails.update(data, { where: { id } });
};

const deleteImportDetail = async (id) => {
  return await db.ImportDetails.destroy({ where: { id } });
};

module.exports = {
  getAllImportDetails,
  getImportDetailById,
  createImportDetail,
  updateImportDetail,
  deleteImportDetail,
};
