const supplierService = require("../services/supplierService");

const getAll = async (req, res) => {
  try {
    const { page, limit, search } = req.query;
    const suppliers = await supplierService.getAllSuppliers({
      page,
      limit,
      search,
    });
    res.status(200).json({ success: true, ...suppliers });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const supplier = await supplierService.getSupplierById(req.params.id);
    if (!supplier) return res.status(404).json({ error: "Supplier not found" });
    res.json(supplier);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const create = async (req, res) => {
  try {
    const supplier = await supplierService.createSupplier(req.body);
    res.status(201).json(supplier);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const supplier = await supplierService.updateSupplier(
      req.params.id,
      req.body
    );
    if (!supplier) {
      return res.status(404).json({ error: "Supplier not found" });
    }
    res.json({ message: "Supplier updated", data: supplier });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ error: error.message });
  }
};
const remove = async (req, res) => {
  try {
    const deletedRows = await supplierService.deleteSupplier(req.params.id);
    if (deletedRows === 0)
      return res.status(404).json({ error: "Supplier not found" });
    res.json({ message: "Supplier deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAll, getById, create, update, remove };
