import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchTotalRevenue = async () => {
  const res = await axios.get(`${API_URL}/api/v1/statistics/revenue`);
  if (res.status !== 200) throw new Error("Lỗi khi lấy doanh thu");
  return res.data;
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
export const fetchRevenueByPeriod = async (period = 'month') => {
    try {
        const response = await axios.get(`${API_URL}/api/v1/statistics/revenue-by-period`, {
            params: { period }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching revenue data:", error);
        throw error.response.data || new Error("Không thể lấy dữ liệu doanh thu");
    }
};

// Lấy top sản phẩm bán chạy
export const fetchTopSellingProducts = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/v1/statistics/top-selling-products`);
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

