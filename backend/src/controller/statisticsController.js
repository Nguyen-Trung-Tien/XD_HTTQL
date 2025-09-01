
const { Order, OrderItem,Stock,Customers } = require("../models");
const { Op , Sequelize} = require("sequelize");

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
const getAllOrders = async (req,res) => {
  try {
    const orders = await Order.count();
    res.status(200).json(orders); 
  } catch (error) {
    res.status(500).json({ message: "Lỗi máy chủ nội bộ", error: error.message });
  }
}
const getAllStock = async (req, res) => {
  try {
    const stock = await Stock.count();
    res.status(200).json(stock);
  } catch (error) {
    res.status(500).json({ message: "Lỗi máy chủ nội bộ", error: error.message });
  }
};
const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customers.count();
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: "Lỗi máy chủ nội bộ", error: error.message });
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
    // period: "year" | "lastYear" | "2023" | "2024" ...
    const period = req.query.period || "year";
    const now = new Date();
    let year = now.getFullYear();

    if (period === "lastYear") {
      year = year - 1;
    } else if (!isNaN(Number(period))) {
      year = Number(period); 
    }
    // Lấy tất cả đơn hàng hoàn thành trong năm
    const orders = await Order.findAll({
      where: {
        status: "delivered",
        createdAt: {
          [Op.gte]: new Date(`${year}-01-01`),
          [Op.lte]: new Date(`${year}-12-31`),
        },
      },
      attributes: ["id", "createdAt"],
      include: [
        {
          model: OrderItem,
          as: "orderitems",
          attributes: ["price", "quantity"],
        },
      ],
    });

    // Tính tổng doanh thu từng tháng
    const revenueByMonth = Array(12).fill(0);
    orders.forEach((order) => {
      const month = new Date(order.createdAt).getMonth(); // 0-11
      let sum = 0;
      if (order.orderitems && order.orderitems.length) {
        sum = order.orderitems.reduce(
          (acc, d) => acc + Number(d.price || 0) * Number(d.quantity || 0),
          0
        );
      }
      revenueByMonth[month] += sum;
    });

    // Trả về dạng [{ period: "2025-01", revenue: 12345 }, ...]
    const result = revenueByMonth.map((revenue, idx) => ({
      period: `${year}-${String(idx + 1).padStart(2, "0")}`,
      revenue,
    }));

    res.json(result);
  } catch (err) {
    console.error("getRevenueByPeriod error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// sản phẩm bán chạy
const getTopSellingProducts = async (req, res) => {
  try {
    const now = new Date();
    const year = Number(req.query.year) || now.getFullYear();
    const prevYear = year - 1;

    // Lấy orderId của đơn hàng delivered năm hiện tại
    const orders = await Order.findAll({
      where: {
        status: "delivered",
        createdAt: {
          [Op.gte]: new Date(`${year}-01-01`),
          [Op.lte]: new Date(`${year}-12-31`),
        },
      },
      attributes: ["id"],
    });
    const orderIds = orders.map((o) => o.id);

    // Lấy orderId của đơn hàng delivered năm trước
    const prevOrders = await Order.findAll({
      where: {
        status: "delivered",
        createdAt: {
          [Op.gte]: new Date(`${prevYear}-01-01`),
          [Op.lte]: new Date(`${prevYear}-12-31`),
        },
      },
      attributes: ["id"],
    });
    const prevOrderIds = prevOrders.map((o) => o.id);

    // Sản phẩm bán chạy năm nay
    const topProducts = await OrderItem.findAll({
      where: {
        orderId: { [Op.in]: orderIds },
      },
      attributes: [
        "productId",
        "name",
        [Sequelize.fn("SUM", Sequelize.col("quantity")), "totalQuantity"],
        [Sequelize.fn("SUM", Sequelize.literal("price * quantity")), "totalRevenue"],
      ],
      group: ["productId", "name"],
      order: [[Sequelize.literal("totalQuantity"), "DESC"]],
      limit: 10,
      raw: true,
    });

    // Số liệu năm trước cho các sản phẩm đó
    const prevStats = await OrderItem.findAll({
      where: {
        orderId: { [Op.in]: prevOrderIds },
        productId: { [Op.in]: topProducts.map(p => p.productId) },
      },
      attributes: [
        "productId",
        [Sequelize.fn("SUM", Sequelize.col("quantity")), "prevQuantity"],
        [Sequelize.fn("SUM", Sequelize.literal("price * quantity")), "prevRevenue"],
      ],
      group: ["productId"],
      raw: true,
    });

    // Gộp số liệu
    const prevMap = {};
    prevStats.forEach(p => {
      prevMap[p.productId] = p;
    });

    const result = topProducts.map(p => ({
      ...p,
      prevQuantity: Number(prevMap[p.productId]?.prevQuantity) || 0,
      prevRevenue: Number(prevMap[p.productId]?.prevRevenue) || 0,
    }));

    res.json(result);
  } catch (error) {
    console.error("getTopSellingProducts error:", error);
    res.status(500).json({ message: "Server error" });
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
  getAllOrders,
  getAllStock,
  getAllCustomers
};

