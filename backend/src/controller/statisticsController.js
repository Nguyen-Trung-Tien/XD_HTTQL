
const { Order, OrderItem } = require("../models");
const { Op } = require("sequelize");

const getTotalRevenue = async (req, res) => {
  try {
    const result = await OrderItem.findAll({
      attributes: [
        [
          Sequelize.fn("SUM", Sequelize.literal("price * quantity")),
          "totalProduct",
        ],
      ],
    });
    const shipResult = await Order.findAll({
      attributes: [
        [Sequelize.fn("SUM", Sequelize.col("shippingFee")), "totalShip"],
      ],
    });
    const totalProduct = Number(result[0].dataValues.totalProduct) || 0;
    const totalShip = Number(shipResult[0].dataValues.totalShip) || 0;
    res.json({
      totalRevenue: totalProduct + totalShip,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Hàm trợ giúp để lấy ngày bắt đầu dựa trên khoảng thời gian
const getStartDate = (period) => {
  const now = new Date();
  if (period === "week") {
    const firstDayOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
    return new Date(firstDayOfWeek.setHours(0, 0, 0, 0));
  } else if (period === "month") {
    return new Date(now.getFullYear(), now.getMonth(), 1);
  } else if (period === "year") {
    return new Date(now.getFullYear(), 0, 1);
  }
  // Mặc định là 'hôm nay'
  return new Date(now.setHours(0, 0, 0, 0));
};

// Hàm chính để lấy thống kê tổng quan
const getGeneralStats = async (req, res) => {
  try {
    const { period = "month" } = req.query; // 'week', 'month', 'year'
    const startDate = getStartDate(period);

    const totalOrders = await Order.count({
      where: { createdAt: { [Op.gte]: startDate } },
    });
    const totalRevenueResult = await Order.findOne({
      attributes: [
        [sequelize.fn("SUM", sequelize.col("total")), "totalRevenue"],
      ],
      where: { status: "completed", createdAt: { [Op.gte]: startDate } },
    });
    const totalRevenue = totalRevenueResult.getDataValue("totalRevenue") || 0;
    const newCustomers = await Customer.count({
      where: { createdAt: { [Op.gte]: startDate } },
    });
    const productsSoldCountResult = await OrderItem.findOne({
      attributes: [
        [sequelize.fn("SUM", sequelize.col("quantity")), "totalQuantity"],
      ],
      include: [
        {
          model: Order,
          as: "order",
          where: { createdAt: { [Op.gte]: startDate } },
        },
      ],
    });
    const productsSoldCount =
      productsSoldCountResult.getDataValue("totalQuantity") || 0;

    res.status(200).json({
      totalOrders,
      totalRevenue,
      newCustomers,
      productsSoldCount,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi máy chủ nội bộ", error: error.message });
  }
};

//lấy doanh thu theo kỳ
const getRevenueByPeriod = async (req, res) => {
  try {
    const { period = "month" } = req.query; // 'day', 'week', 'month', 'year'
    let groupBy, dateFormat;

    switch (period) {
      case "day":
        groupBy = [sequelize.fn("DATE", sequelize.col("createdAt"))];
        dateFormat = "%Y-%m-%d";
        break;
      case "week":
        groupBy = [
          sequelize.fn("YEAR", sequelize.col("createdAt")),
          sequelize.fn("WEEK", sequelize.col("createdAt")),
        ];
        dateFormat = "%Y-%u";
        break;
      case "year":
        groupBy = [
          sequelize.fn("YEAR", sequelize.col("createdAt")),
          sequelize.fn("MONTH", sequelize.col("createdAt")),
        ];
        dateFormat = "%Y-%m";
        break;
      default: // month
        groupBy = [sequelize.fn("DATE", sequelize.col("createdAt"))];
        dateFormat = "%Y-%m-%d";
        break;
    }

    const revenue = await Order.findAll({
      attributes: [
        [
          sequelize.fn("DATE_FORMAT", sequelize.col("createdAt"), dateFormat),
          "period",
        ],
        [sequelize.fn("SUM", sequelize.col("total")), "revenue"],
      ],
      where: { status: "completed" },
      group: groupBy,
      order: [[sequelize.col("period"), "ASC"]],
    });
    res.status(200).json(revenue);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi máy chủ nội bộ", error: error.message });
  }
};

// sản phẩm bán chạy
const getTopSellingProducts = async (req, res) => {
  try {
    const topProducts = await OrderItem.findAll({
      attributes: [
        "productId",
        "name",
        [sequelize.fn("SUM", sequelize.col("quantity")), "totalQuantity"],
      ],
      group: ["productId", "name"],
      order: [[sequelize.col("totalQuantity"), "DESC"]],
      limit: 10,
    });
    res.status(200).json(topProducts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi máy chủ nội bộ", error: error.message });
  }
};

// trạng thái đơn hàng
const getOrderStatusStats = async (req, res) => {
  try {
    const orderStatus = await Order.findAll({
      attributes: [
        "status",
        [sequelize.fn("COUNT", sequelize.col("status")), "count"],
      ],
      group: ["status"],
    });
    res.status(200).json(orderStatus);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi máy chủ nội bộ", error: error.message });
  }
};

module.exports = {
  getTotalRevenue,
  getGeneralStats,
  getRevenueByPeriod,
  getTopSellingProducts,
  getOrderStatusStats,
};

