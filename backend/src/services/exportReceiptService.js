const db = require("../models/index");

const getAllExportReceipts = async () => {
  return await db.ExportReceipts.findAll({
    include: [
      { model: db.User, as: "userData" },
      {
        model: db.ExportDetails,
        as: "exportDetailData",
        include: [{ model: db.Product, as: "productData" }],
      },
    ],
  });
};

const getExportReceiptById = async (id) => {
  const receipt = await db.ExportReceipts.findByPk(id, {
    include: [
      { model: db.User, as: "userData" },
      {
        model: db.ExportDetails,
        as: "exportDetailData",
        include: [{ model: db.Product, as: "productData" }],
      },
    ],
  });
  if (!receipt) throw new Error("Export receipt not found");
  return receipt;
};

const createExportReceipt = async (data) => {
  return await db.ExportReceipts.create(data);
};

const updateExportReceipt = async (id, data) => {
  const receipt = await db.ExportReceipts.findByPk(id);
  if (!receipt) throw new Error("Export receipt not found");
  await receipt.update(data);
  return receipt;
};

const deleteExportReceipt = async (id) => {
  const receipt = await db.ExportReceipts.findByPk(id);
  if (!receipt) throw new Error("Export receipt not found");
  await receipt.destroy();
  return true;
};

module.exports = {
  getAllExportReceipts,
  getExportReceiptById,
  createExportReceipt,
  updateExportReceipt,
  deleteExportReceipt,
};
