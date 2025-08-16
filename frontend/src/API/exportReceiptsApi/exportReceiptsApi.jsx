import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchExportReceipts = () => {
  return axios.get(`${API_URL}/api/v1/export-receipt/get-all`);
};
const fetchExportReceiptById = (id) => {
  return axios.get(`${API_URL}/api/v1/export-receipt/get/${id}`);
};

const createExportReceipt = (data) => {
  return axios.post(`${API_URL}/api/v1/export-receipt/create`, data);
};

const updateExportReceipt = (id, data) => {
  return axios.put(`${API_URL}/api/v1/export-receipt/update/${id}`, data);
};

const deleteExportReceipt = (id) => {
  return axios.delete(`${API_URL}/api/v1/export-receipt/remove/${id}`);
};

export {
  fetchExportReceiptById,
  createExportReceipt,
  updateExportReceipt,
  deleteExportReceipt,
};
