import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const fetchExportDetails = () => {
  return axios.get(`${API_URL}/api/v1/export-detail/get-all`);
};

const createExportDetail = (data) => {
  return axios.post(`${API_URL}/api/v1/export-detail/create`, data);
};

const updateExportDetail = (id, data) => {
  return axios.put(`${API_URL}/api/v1/export-detail/update/${id}`, data);
};

const deleteExportDetail = (id) => {
  return axios.delete(`${API_URL}/api/v1/export-detail/remove/${id}`);
};

export {
  fetchExportDetails,
  createExportDetail,
  updateExportDetail,
  deleteExportDetail,
};
