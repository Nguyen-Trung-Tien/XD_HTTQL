// src/API/exportReceiptsApi.js
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Lấy tất cả ExportReceipts
export const fetchExportReceipts = () => {
  return axios.get(`${API_URL}/api/v1/export-receipt/get-all`);
};
// Lấy ExportReceipt theo ID
const fetchExportReceiptById = (id) => {
  return axios.get(`${API_URL}/api/v1/export-receipt/get/${id}`);
};

// Thêm mới ExportReceipt
const createExportReceipt = (data) => {
  return axios.post(`${API_URL}/api/v1/export-receipt/create`, data);
};

// Cập nhật ExportReceipt
const updateExportReceipt = (id, data) => {
  return axios.put(`${API_URL}/api/v1/export-receipt/update/${id}`, data);
};

// Xóa ExportReceipt
const deleteExportReceipt = (id) => {
  return axios.delete(`${API_URL}/api/v1/export-receipt/remove/${id}`);
};

export {
  fetchExportReceiptById,
  createExportReceipt,
  updateExportReceipt,
  deleteExportReceipt,
};
