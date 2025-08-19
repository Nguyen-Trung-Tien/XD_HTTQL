import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getAllStock = async (page = 1, limit = 10) => {
  const res = await axios.get(`${API_URL}/api/v1/stock`, {
    params: { page, limit }
  });
  return res.data;
};

export const getStockById = async (id) => {
  const res = await axios.get(`${API_URL}/api/v1/stock/${id}`);
  return res.data;
};

export const createStock = async (data) => {
  const res = await axios.post(`${API_URL}/api/v1/stock/create`, data);
  return res.data;
};

export const updateStock = async (id, data) => {
  const res = await axios.put(`${API_URL}/api/v1/stock/edit/${id}`, data);
  return res.data;
};

export const deleteStock = async (id) => {
  const res = await axios.delete(`${API_URL}/api/v1/stock/delete/${id}`);
  return res.data;
};
