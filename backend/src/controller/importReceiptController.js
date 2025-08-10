const importReceiptService = require("../services/importReceiptService");

const getAll = async (req, res) => {
  try {
    const receipts = await importReceiptService.getAllImportReceipts();
    res.json(receipts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const receipt = await importReceiptService.getImportReceiptById(
      req.params.id
    );
    if (!receipt) return res.status(404).json({ error: "Not found" });
    res.json(receipt);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const create = async (req, res) => {
  try {
    const receipt = await importReceiptService.createImportReceipt(req.body);
    res.status(201).json(receipt);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const update = async (req, res) => {
  try {
    const updated = await importReceiptService.updateImportReceipt(
      req.params.id,
      req.body
    );
    res.json({ updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const remove = async (req, res) => {
  try {
    await importReceiptService.deleteImportReceipt(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAll, getById, create, update, remove };
