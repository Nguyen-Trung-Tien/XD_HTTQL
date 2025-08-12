import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/v1/import-detail`;

export const getAllImportDetails = async () => {
  const res = await axios.get(`${API_URL}/get-all`);
  return res.data;
};

export const getImportDetailById = async (id) => {
  const res = await axios.get(`${API_URL}/get-by/${id}`);
  return res.data;
};

export const createImportDetail = async (data) => {
  const res = await axios.post(`${API_URL}/create`, data);
  return res.data;
};

export const updateImportDetail = async (id, data) => {
  const res = await axios.put(`${API_URL}/update/${id}`, data);
  return res.data;
};

export const deleteImportDetail = async (id) => {
  const res = await axios.delete(`${API_URL}/remove/${id}`);
  return res.data;
};
