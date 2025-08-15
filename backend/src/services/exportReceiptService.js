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
  const { exportDetailData, ...receiptData } = data;

  const receipt = await db.ExportReceipts.create(receiptData);

  if (exportDetailData && exportDetailData.length > 0) {
    for (const d of exportDetailData) {
      await db.ExportDetails.create({
        exportId: receipt.id,
        productId: d.productId,
        quantity: d.quantity,
      });
    }
  }

  return await getExportReceiptById(receipt.id);
};

const updateExportReceipt = async (id, data) => {
  const { exportDetailData, ...receiptData } = data;

  const receipt = await db.ExportReceipts.findByPk(id);
  if (!receipt) throw new Error("Export receipt not found");

  await receipt.update(receiptData);

  await db.ExportDetails.destroy({ where: { exportId: id } });

  if (exportDetailData && exportDetailData.length > 0) {
    for (const d of exportDetailData) {
      await db.ExportDetails.create({
        exportId: id,
        productId: d.productId,
        quantity: d.quantity,
      });
    }
  }

  return await getExportReceiptById(id);
};

const deleteExportReceipt = async (id) => {
  const receipt = await db.ExportReceipts.findByPk(id);
  if (!receipt) throw new Error("Export receipt not found");

  await db.ExportDetails.destroy({ where: { exportId: id } });

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
