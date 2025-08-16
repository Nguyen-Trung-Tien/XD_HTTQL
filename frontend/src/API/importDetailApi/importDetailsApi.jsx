import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const getAllImportDetails = () => {
  return axios.get(`${API_URL}/api/v1/import-detail/get-all`);
};

const getImportDetailById = (id) => {
  return axios.get(`${API_URL}/api/v1/import-detail/get/${id}`);
};

const createImportDetail = (data) => {
  return axios.post(`${API_URL}/api/v1/import-detail/create`, data);
};

const updateImportDetail = (id, data) => {
  return axios.put(`${API_URL}/api/v1/import-detail/update/${id}`, data);
};

const deleteImportDetail = (id) => {
  return axios.delete(`${API_URL}/api/v1/import-detail/remove/${id}`);
};

export {
  getAllImportDetails,
  getImportDetailById,
  createImportDetail,
  updateImportDetail,
  deleteImportDetail,
};
