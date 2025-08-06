const db = require("../models");

const getAllShippers = async (req, res) => {
  try {
    const shippers = await db.Shipper.findAll();
    res.json(shippers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createShipper = async (req, res) => {
  try {
    const { name, phoneNumber, status, lat, lng, address } = req.body;

    if (!name || !phoneNumber) {
      return res.status(400).json({
        message: 'Missing required fields: name or phone number',
      });
    }

    const existing = await db.Shipper.findOne({ where: { phoneNumber } });
    if (existing) {
      return res.status(409).json({
        message: 'Phone number already exists',
      });
    }

    const shipper = await db.Shipper.create({
      name,
      phoneNumber,
      status,
      lat,
      lng,
      address,
    });

    return res.status(201).json({
      message: 'Shipper created successfully',
      data: shipper,
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Internal server error',
      error: err.message,
    });
  }
};


const updateShipper = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await db.Shipper.update(req.body, { where: { id } });
    if (updated) {
      const updatedShipper = await db.Shipper.findByPk(id);
      res.status(200).json({
        message: "Shipper updated successfully.",
        data: updatedShipper
      });
    } else {
      res.status(404).json({ message: "Shipper not found." });
    }
  } catch (err) {
    res.status(400).json({
      message: "Failed to update shipper.",
      error: err.message
    });
  }
};


const deleteShipper = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await db.Shipper.destroy({ where: { id } });
    if (deleted) {
      res.json({ message: "Shipper deleted" });
    } else {
      res.status(404).json({ error: "Shipper not found" });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
const updateShipperStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, currentOrderId, address, lat, lng } = req.body;

    const updateData = {
      status,
      currentOrderId: currentOrderId === undefined ? db.Sequelize.literal('currentOrderId') : currentOrderId,
     
      address: address || db.Sequelize.literal('address'),
      lat: lat || db.Sequelize.literal('lat'),
      lng: lng || db.Sequelize.literal('lng')
    };

    const [updated] = await db.Shipper.update(updateData, { where: { id } });

    if (updated) {
      const updatedShipper = await db.Shipper.findByPk(id);
      res.status(200).json({
        message: "Shipper status updated successfully.",
        data: updatedShipper,
      });
    } else {
      res.status(404).json({ message: "Shipper not found." });
    }
  } catch (err) {
    res.status(400).json({
      message: "Failed to update shipper status.",
      error: err.message,
    });
  }
};
module.exports = {
  getAllShippers,
  createShipper,
  updateShipper,
  deleteShipper,
  updateShipperStatus,
};
