const db = require("../models");

const getAllImportDetails = () => {
  return db.ImportDetails.findAll({
    include: [
      { model: db.ImportReceipts, as: "importReceiptData" },
      { model: db.Stock, as: "StockProductData" },
    ],
    order: [["id", "DESC"]],
  });
};

const getImportDetailById = async (id) => {
  const detail = await db.ImportDetails.findByPk(id, {
    include: [
      { model: db.ImportReceipts, as: "importReceiptData" },
      { model: db.Stock, as: "StockProductData" },
    ],
  });
  if (!detail) throw new Error(`Import detail with ID ${id} not found`);
  return detail;
};

const createImportDetail = async (data) => {
  return await db.sequelize.transaction(async (t) => {
    const receipt = await db.ImportReceipts.findByPk(data.importId, { transaction: t });
    if (!receipt) throw new Error(`Import receipt ${data.importId} not found`);

    const stock = await db.Stock.findByPk(data.productId, { transaction: t });
    if (!stock) throw new Error("Không tìm thấy sản phẩm trong kho");

    data.quantity = Number(data.quantity);
    data.price = Number(data.price);

    if (!Number.isInteger(data.quantity) || data.quantity <= 0)
      throw new Error("Quantity must be a positive integer");
    if (data.price <= 0) throw new Error("Price must be greater than 0");

    // tăng tồn kho
    await stock.increment("stock", { by: data.quantity, transaction: t });

    // tạo chi tiết nhập
    return await db.ImportDetails.create(data, { transaction: t });
  });
};


const updateImportDetail = async (id, data) => {
  return await db.sequelize.transaction(async (t) => {
    const detail = await db.ImportDetails.findByPk(id, { transaction: t });
    if (!detail) throw new Error(`Import detail ${id} not found`);

    const stock = await db.Stock.findByPk(detail.productId, { transaction: t });
    if (!stock) throw new Error("Không tìm thấy sản phẩm trong kho");

    const oldQuantity = detail.quantity;
    const newQuantity = Number(data.quantity);

    // điều chỉnh lại tồn kho (thêm hoặc bớt chênh lệch)
    await stock.increment("stock", {
      by: newQuantity - oldQuantity,
      transaction: t,
    });

    return await detail.update(data, { transaction: t });
  });
};


const deleteImportDetail = async (id) => {
  return await db.sequelize.transaction(async (t) => {
    const detail = await db.ImportDetails.findByPk(id, { transaction: t });
    if (!detail) throw new Error(`Import detail ${id} not found`);

    const stock = await db.Stock.findByPk(detail.productId, { transaction: t });
    if (stock) {
      // trừ lại tồn kho
      await stock.decrement("stock", { by: detail.quantity, transaction: t });
    }

    await detail.destroy({ transaction: t });

    return { message: "Deleted successfully" };
  });
};


module.exports = {
  getAllImportDetails,
  getImportDetailById,
  createImportDetail,
  updateImportDetail,
  deleteImportDetail,
};
