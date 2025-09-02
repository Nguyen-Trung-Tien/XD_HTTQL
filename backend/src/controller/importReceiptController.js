const importReceiptService = require("../services/importReceiptService");

const getAll = async (req, res) => {
  try {
    const receipts = await importReceiptService.getAllImportReceipts();
    res.status(200).json({ success: true, data: receipts });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const receipt = await importReceiptService.getImportReceiptById(
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
    const receipt = await importReceiptService.createImportReceipt(req.body);
    const fullReceipt = await importReceiptService.getImportReceiptById(
      receipt.id
    );
    res.status(201).json({ success: true, data: fullReceipt });
  } catch (err) {
    if (err.message.includes("required") || err.message.includes("invalid")) {
      return res.status(400).json({ success: false, error: err.message });
    }
    res.status(500).json({ success: false, error: err.message });
  }
};

const update = async (req, res) => {
  try {
    await importReceiptService.updateImportReceipt(req.params.id, req.body);
    const updatedReceipt = await importReceiptService.getImportReceiptById(
      req.params.id
    );
    res.status(200).json({ success: true, data: updatedReceipt });
  } catch (err) {
    if (err.message.includes("not found")) {
      return res.status(404).json({ success: false, error: err.message });
    }
    res.status(500).json({ success: false, error: err.message });
  }
};

const remove = async (req, res) => {
  try {
    await importReceiptService.deleteImportReceipt(req.params.id);
    res
      .status(200)
      .json({
        success: true,
        message: `Receipt ${req.params.id} deleted successfully`,
      });
  } catch (err) {
    if (err.message.includes("not found")) {
      return res.status(404).json({ success: false, error: err.message });
    }
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = { getAll, getById, create, update, remove };
