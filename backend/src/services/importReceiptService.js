const db = require("../models/index");

const getAllImportReceipts = async () => {
  return await db.ImportReceipt.findAll({
    include: [
      { model: db.Supplier, as: "supplierData" },
      { model: db.User, as: "userData" },
      {
        model: db.ImportDetail,
        as: "importDetails",
        include: [{ model: db.Product, as: "productData" }],
      },
    ],
  });
};

const getImportReceiptById = async (id) => {
  return await db.ImportReceipt.findByPk(id, {
    include: [
      { model: db.Supplier, as: "supplierData" },
      { model: db.User, as: "userData" },
      {
        model: db.ImportDetail,
        as: "importDetails",
        include: [{ model: db.Product, as: "productData" }],
      },
    ],
  });
};

const createImportReceipt = async (data) => {
  const { details, ...receiptData } = data;
  const t = await db.sequelize.transaction();
  try {
    const receipt = await db.ImportReceipt.create(receiptData, {
      transaction: t,
    });

    if (details?.length) {
      for (const item of details) {
        await db.ImportDetail.create(
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
  return await db.ImportReceipt.update(data, { where: { id } });
};

const deleteImportReceipt = async (id) => {
  const t = await db.sequelize.transaction();
  try {
    await db.ImportDetail.destroy({ where: { importId: id }, transaction: t });
    await db.ImportReceipt.destroy({ where: { id }, transaction: t });
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
