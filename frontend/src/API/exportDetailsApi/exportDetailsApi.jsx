import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Lấy tất cả ExportDetails
const fetchExportDetails = () => {
  return axios.get(`${API_URL}/api/v1/export-detail/get-all`);
};

// Thêm mới ExportDetail
const createExportDetail = (data) => {
  return axios.post(`${API_URL}/api/v1/export-detail/create`, data);
};

// Cập nhật ExportDetail
const updateExportDetail = (id, data) => {
  return axios.put(`${API_URL}/api/v1/export-detail/update/${id}`, data);
};

// Xóa ExportDetail
const deleteExportDetail = (id) => {
  return axios.delete(`${API_URL}/api/v1/export-detail/remove/${id}`);
};

export {
  fetchExportDetails,
  createExportDetail,
  updateExportDetail,
  deleteExportDetail,
};
