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
  });
};

const getImportReceiptById = async (id) => {
  return await db.ImportReceipts.findByPk(id, {
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
};

const createImportReceipt = async (data) => {
  const { details, ...receiptData } = data;
  const t = await db.sequelize.transaction();
  try {
    const receipt = await db.ImportReceipts.create(receiptData, {
      transaction: t,
    });

    if (details?.length) {
      for (const item of details) {
        await db.ImportDetails.create(
          {
            importId: receipt.id,
            ...item,
          },
          { transaction: t }
        );
      }
    }

    await t.commit();
    return receipt;
  } catch (err) {
    await t.rollback();
    throw err;
  }
};

const updateImportReceipt = async (id, data) => {
  return await db.ImportReceipts.update(data, { where: { id } });
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
