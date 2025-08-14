const db = require("../models/index");

const getAllSuppliers = async () => {
  return await db.Suppliers.findAll({
    include: [
      {
        model: db.ImportReceipts,
        as: "importReceiptData",
        include: [
          {
            model: db.ImportDetails,
            as: "importDetailData",
            include: [{ model: db.Product, as: "productData" }],
          },
        ],
      },
    ],
    order: [["id", "DESC"]],
  });
};

const getSupplierById = async (id) => {
  const supplier = await db.Suppliers.findByPk(id, {
    include: [
      {
        model: db.ImportReceipts,
        as: "importReceiptData",
        include: [
          {
            model: db.ImportDetails,
            as: "importDetailData",
            include: [{ model: db.Product, as: "productData" }],
          },
        ],
      },
    ],
  });

  if (!supplier) {
    throw new Error(`Supplier with ID ${id} not found`);
  }
  return supplier;
};

const createSupplier = async (data) => {
  if (!data.name) {
    throw new Error("Supplier name is required");
  }
  return await db.Suppliers.create(data);
};

const updateSupplier = async (id, data) => {
  const supplier = await db.Suppliers.findByPk(id);
  if (!supplier) {
    throw new Error(`Supplier with ID ${id} not found`);
  }
  await db.Suppliers.update(data, { where: { id } });
  return true;
};

const deleteSupplier = async (id) => {
  const supplier = await db.Suppliers.findByPk(id, {
    include: [{ model: db.ImportReceipts, as: "importReceiptData" }],
  });

  if (!supplier) {
    throw new Error(`Supplier with ID ${id} not found`);
  }

  if (supplier.importReceiptData.length > 0) {
    throw new Error("Cannot delete supplier with existing import receipts");
  }

  await db.Suppliers.destroy({ where: { id } });
  return true;
};

module.exports = {
  getAllSuppliers,
  getSupplierById,
  createSupplier,
  updateSupplier,
  deleteSupplier,
};
