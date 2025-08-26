const db = require("../models/index");
const { Op } = require("sequelize");

const supplierInclude = [
  {
    model: db.ImportReceipts,
    as: "importReceiptData",
    include: [
      {
        model: db.ImportDetails,
        as: "importDetailData",
        include: [
          {
            model: db.Stock,
            as: "StockProductData",
          },
        ],
      },
    ],
  },
];

const getAllSuppliers = async ({ page = 1, limit = 10, search = "" }) => {
  try {
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const offset = (page - 1) * limit;

    const whereCondition = {
      ...(search
        ? {
            [Op.or]: [
              { name: { [Op.like]: `%${search}%` } },
              { phoneNumber: { [Op.like]: `%${search}%` } },
              { address: { [Op.like]: `%${search}%` } },
            ],
          }
        : {}),
    };

    const { count, rows } = await db.Suppliers.findAndCountAll({
      attributes: [
        "id",
        "name",
        "phoneNumber",
        "address",
        "image",
        "description",
      ],
      include: supplierInclude,
      where: whereCondition,
      order: [["id", "DESC"]],
      limit,
      offset,
      distinct: true,
    });

    return {
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      suppliers: rows,
    };
  } catch (error) {
    throw new Error(error.message || "Failed to get suppliers");
  }
};

const getManySuppliers = async () => {
  try {
    const suppliers = await db.Suppliers.findAll({
      attributes: ["id", "name", "phoneNumber", "address"],
      order: [["name", "ASC"]],
    });

    return suppliers;
  } catch (error) {
    throw new Error(error.message || "Failed to get all suppliers");
  }
};

const createSupplier = async (data) => {
  try {
    if (!data.name) throw new Error("Supplier name is required");

    const newSupplier = await db.Suppliers.create(data);
    return newSupplier;
  } catch (error) {
    throw new Error(error.message || "Failed to create supplier");
  }
};

const updateSupplier = async (id, data) => {
  try {
    const supplier = await db.Suppliers.findByPk(id);
    if (!supplier) return null;

    const validFields = {
      name: data.name,
      phoneNumber: data.phoneNumber,
      address: data.address,
      description: data.description,
    };

    await supplier.update(validFields);
    return supplier;
  } catch (error) {
    throw new Error(error.message || "Failed to update supplier");
  }
};

const deleteSupplier = async (id) => {
  try {
    const supplier = await db.Suppliers.findByPk(id, {
      include: [{ model: db.ImportReceipts, as: "importReceiptData" }],
    });

    if (!supplier) throw new Error(`Supplier with ID ${id} not found`);
    if (supplier.importReceiptData.length > 0)
      throw new Error("Cannot delete supplier with existing import receipts");

    await db.Suppliers.destroy({ where: { id } });
    return { message: "Supplier deleted successfully" };
  } catch (error) {
    throw new Error(error.message || "Failed to delete supplier");
  }
};

module.exports = {
  getAllSuppliers,
  getManySuppliers,
  createSupplier,
  updateSupplier,
  deleteSupplier,
};
