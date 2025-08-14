const exportDetailService = require("../services/exportDetailService");

const getAll = async (req, res) => {
  try {
    const details = await exportDetailService.getAllExportDetails();
    res.status(200).json({ success: true, data: details });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const detail = await exportDetailService.getExportDetailById(req.params.id);
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
    const detail = await exportDetailService.createExportDetail(req.body);
    res.status(201).json({ success: true, data: detail });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const update = async (req, res) => {
  try {
    const updated = await exportDetailService.updateExportDetail(
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
    await exportDetailService.deleteExportDetail(req.params.id);
    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    if (err.message.includes("not found")) {
      return res.status(404).json({ success: false, error: err.message });
    }
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = { getAll, getById, create, update, remove };
