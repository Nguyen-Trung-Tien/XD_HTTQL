const importDetailService = require("../services/importDetailService");

const getAll = async (req, res) => {
  try {
    const details = await importDetailService.getAllImportDetails();
    res.json(details);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const detail = await importDetailService.getImportDetailById(req.params.id);
    if (!detail) return res.status(404).json({ error: "Not found" });
    res.json(detail);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const create = async (req, res) => {
  try {
    const detail = await importDetailService.createImportDetail(req.body);
    res.status(201).json(detail);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const update = async (req, res) => {
  try {
    const updated = await importDetailService.updateImportDetail(
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
    await importDetailService.deleteImportDetail(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAll, getById, create, update, remove };
