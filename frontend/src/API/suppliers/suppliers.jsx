import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getAllSuppliers = async () => {
  const res = await axios.get(`${API_URL}/api/v1/suppliers/get-all`);
  return res.data;
};

export const getSupplierById = async (id) => {
  const res = await axios.get(`${API_URL}/api/v1/suppliers/get-by/${id}`);
  return res.data;
};

export const createSupplier = async (supplierData) => {
  const res = await axios.post(
    `${API_URL}/api/v1/suppliers/create`,
    supplierData
  );
  return res.data;
};

export const updateSupplier = async (id, supplierData) => {
  const res = await axios.put(
    `${API_URL}/api/v1/suppliers/update/${id}`,
    supplierData
  );
  return res.data;
};

export const deleteSupplier = async (id) => {
  const res = await axios.delete(`${API_URL}/api/v1/suppliers/remove/${id}`);
  return res.data;
};
