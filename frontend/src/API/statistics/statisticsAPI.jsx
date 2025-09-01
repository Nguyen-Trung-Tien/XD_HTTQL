import axios from "axios";
import axiosInstance from "../../API/utils/axiosInstance";
const API_URL = import.meta.env.VITE_API_URL;

export const fetchTotalRevenue = async () => {
  const res = await axios.get(`${API_URL}/api/v1/statistics/revenue`);
  if (res.status !== 200) throw new Error("Lỗi khi lấy doanh thu");
  return res.data;
};

export const fetchAllOrders = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/v1/statistics/all-orders`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all orders:", error);
    throw error.response.data || new Error("Không thể lấy danh sách đơn hàng");
  }
};

export const fetchOrderDetails = async (orderId) => {
  try {
    const response = await axios.get(`${API_URL}/api/v1/statistics/order-details/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order details:", error);
    throw error.response.data || new Error("Không thể lấy thông tin đơn hàng");
  }
};

export const fetchAllStock = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/v1/statistics/all-stock`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all stock:", error);
    throw error.response.data || new Error("Không thể lấy danh sách tồn kho");
  }
};

export const fetchAllCustomers = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/v1/statistics/all-customers`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all customers:", error);
    throw error.response.data || new Error("Không thể lấy danh sách khách hàng");
  }
};

// Lấy thống kê tổng quan
export const fetchGeneralStats = async (period = 'month') => {
    try {
        const response = await axios.get(`${API_URL}/api/v1/statistics/general`, {
            params: { period }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching general stats:", error);
        throw error.response.data || new Error("Không thể lấy số liệu thống kê chung");
    }
};

// Lấy dữ liệu doanh thu để vẽ biểu đồ
export const fetchRevenueByPeriod = async (period = "year") => {
  const res = await axiosInstance.get(`/statistics/revenue-by-period?period=${period}`);
  return res.data;
};
// Lấy top sản phẩm bán chạy
export const fetchTopSellingProducts = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/v1/statistics/top-products`);
        return response.data;
    } catch (error) {
        console.error("Error fetching top selling products:", error);
        throw error.response.data || new Error("Không tìm được sản phẩm bán chạy nhất");
    }
};

// Lấy thống kê trạng thái đơn hàng
export const fetchOrderStatusStats = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/v1/statistics/order-status`);
        return response.data;
    } catch (error) {
        console.error("Error fetching order status stats:", error);
        throw error.response.data || new Error("Không thể lấy số liệu thống kê trạng thái đơn hàng");
    }
};

