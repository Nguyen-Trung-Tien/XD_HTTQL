const db = require("../models");

const getAllExportDetails = async () => {
  return await db.ExportDetails.findAll({
    include: [
      { model: db.ExportReceipts, as: "exportReceiptData" },
      { model: db.Stock, as: "StockProductData" },
    ],
  });
};

const getExportDetailById = async (id) => {
  const detail = await db.ExportDetails.findByPk(id, {
    include: [
      { model: db.ExportReceipts, as: "exportReceiptData" },
      { model: db.Stock, as: "StockProductData" },
    ],
  });
  if (!detail) throw new Error("Export detail not found");
  return detail;
};

const createExportDetail = async (data) => {
  return await db.ExportDetails.create(data);
};

const updateExportDetail = async (id, data) => {
  const detail = await db.ExportDetails.findByPk(id);
  if (!detail) throw new Error("Export detail not found");
  await detail.update(data);
  return detail;
};

const deleteExportDetail = async (id) => {
  const detail = await db.ExportDetails.findByPk(id);
  if (!detail) throw new Error("Export detail not found");
  await detail.destroy();
  return true;
};

module.exports = {
  getAllExportDetails,
  getExportDetailById,
  createExportDetail,
  updateExportDetail,
  deleteExportDetail,
};
