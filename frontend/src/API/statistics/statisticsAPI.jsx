import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchTotalRevenue = async () => {
  const res = await axios.get(`${API_URL}/api/v1/statistics/revenue`);
  if (res.status !== 200) throw new Error("Lỗi khi lấy doanh thu");
  return res.data;
};