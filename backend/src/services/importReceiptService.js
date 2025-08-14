const db = require("../models/index");

const getAllImportReceipts = async () => {
  return await db.ImportReceipts.findAll({
    include: [
      { model: db.Suppliers, as: "supplierData" },
      { model: db.User, as: "userData" },
      {
        model: db.ImportDetails,
        as: "importDetailData",
        include: [{ model: db.Product, as: "productData" }],
      },
    ],
    order: [["id", "DESC"]],
  });
};

const getImportReceiptById = async (id) => {
  const receipt = await db.ImportReceipts.findByPk(id, {
    include: [
      { model: db.Suppliers, as: "supplierData" },
      { model: db.User, as: "userData" },
      {
        model: db.ImportDetails,
        as: "importDetailData",
        include: [{ model: db.Product, as: "productData" }],
      },
    ],
  });
  if (!receipt) {
    throw new Error(`Import receipt with ID ${id} not found`);
  }
  return receipt;
};

const createImportReceipt = async (data) => {
  const { details, ...receiptData } = data;
  const t = await db.sequelize.transaction();
  try {
    const receipt = await db.ImportReceipts.create(receiptData, {
      transaction: t,
    });

    if (details?.length) {
      const detailData = details.map((item) => ({
        importId: receipt.id,
        ...item,
      }));
      await db.ImportDetails.bulkCreate(detailData, { transaction: t });
    }

    await t.commit();
    return receipt;
  } catch (err) {
    await t.rollback();
    throw err;
  }
};

const updateImportReceipt = async (id, data) => {
  const { details, ...receiptData } = data;
  const t = await db.sequelize.transaction();
  try {
    await db.ImportReceipts.update(receiptData, {
      where: { id },
      transaction: t,
    });

    if (details) {
      await db.ImportDetails.destroy({
        where: { importId: id },
        transaction: t,
      });
      const newDetails = details.map((item) => ({ importId: id, ...item }));
      await db.ImportDetails.bulkCreate(newDetails, { transaction: t });
    }

    await t.commit();
    return true;
  } catch (err) {
    await t.rollback();
    throw err;
  }
};

const deleteImportReceipt = async (id) => {
  const t = await db.sequelize.transaction();
  try {
    await db.ImportDetails.destroy({ where: { importId: id }, transaction: t });
    await db.ImportReceipts.destroy({ where: { id }, transaction: t });
    await t.commit();
    return true;
  } catch (err) {
    await t.rollback();
    throw err;
  }
};

module.exports = {
  getAllImportReceipts,
  getImportReceiptById,
  createImportReceipt,
  updateImportReceipt,
  deleteImportReceipt,
};
