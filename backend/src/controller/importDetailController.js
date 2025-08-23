const importDetailService = require("../services/importDetailService");

const getAll = async (req, res) => {
  try {
    const details = await importDetailService.getAllImportDetails();
    res.status(200).json({ success: true, data: details });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const detail = await importDetailService.getImportDetailById(req.params.id);
    res.status(200).json({ success: true, data: detail });
  } catch (err) {
    if (err.message.includes("not found")) {
      return res.status(404).json({ success: false, error: err.message });
    }
    res.status(500).json({ success: false, error: err.message });
  }
};

const create = async (req, res) => {
  try {
    const detail = await importDetailService.createImportDetail(req.body);
    res.status(201).json({ success: true, data: detail });
  } catch (err) {
    if (err.message.includes("not found") || err.message.includes("must be")) {
      return res.status(400).json({ success: false, error: err.message });
    }
    res.status(500).json({ success: false, error: err.message });
  }
};

const update = async (req, res) => {
  try {
    const updated = await importDetailService.updateImportDetail(
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
    const deleted = await importDetailService.deleteImportDetail(req.params.id);
    res.status(200).json({ success: true, data: deleted });
  } catch (err) {
    if (err.message.includes("not found")) {
      return res.status(404).json({ success: false, error: err.message });
    }
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = { getAll, getById, create, update, remove };
