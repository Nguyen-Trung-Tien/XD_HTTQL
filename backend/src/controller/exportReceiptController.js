const exportReceiptService = require("../services/exportReceiptService");

const getAll = async (req, res) => {
  try {
    const receipts = await exportReceiptService.getAllExportReceipts();
    res.status(200).json({ success: true, data: receipts });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const receipt = await exportReceiptService.getExportReceiptById(
      req.params.id
    );
    res.status(200).json({ success: true, data: receipt });
  } catch (err) {
    if (err.message.includes("not found")) {
      return res.status(404).json({ success: false, error: err.message });
    }
    res.status(500).json({ success: false, error: err.message });
  }
};

const create = async (req, res) => {
  try {
    const receipt = await exportReceiptService.createExportReceipt(req.body);
    res.status(201).json({ success: true, data: receipt });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const update = async (req, res) => {
  try {
    const updated = await exportReceiptService.updateExportReceipt(
      req.params.id,
      req.body
    );
    res.status(200).json({ success: true, data: updated });
  } catch (err) {
    if (err.message.includes("not found")) {
      return res.status(404).json({ success: false, error: err.message });
    }
    res.status(500).json({ success: false, error: err.message });
  }
};

const remove = async (req, res) => {
  try {
    await exportReceiptService.deleteExportReceipt(req.params.id);
    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    if (err.message.includes("not found")) {
      return res.status(404).json({ success: false, error: err.message });
    }
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = { getAll, getById, create, update, remove };
