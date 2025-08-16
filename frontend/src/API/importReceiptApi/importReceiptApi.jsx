import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const getAllImportReceipts = async () => {
  const response = await axios.get(`${API_URL}/api/v1/import-receipt/get-all`);
  return response.data;
};

const getImportReceiptById = async (id) => {
  const response = await axios.get(
    `${API_URL}/api/v1/import-receipt/get-by/${id}`
  );
  return response.data;
};

const createImportReceipt = async (data) => {
  const response = await axios.post(
    `${API_URL}/api/v1/import-receipt/create`,
    data
  );
  return response.data;
};

const updateImportReceipt = async (id, data) => {
  const response = await axios.put(
    `${API_URL}/api/v1/import-receipt/update/${id}`,
    data
  );
  return response.data;
};

const deleteImportReceipt = async (id) => {
  const response = await axios.delete(
    `${API_URL}/api/v1/import-receipt/remove/${id}`
  );
  return response.data;
};

export {
  getAllImportReceipts,
  getImportReceiptById,
  createImportReceipt,
  updateImportReceipt,
  deleteImportReceipt,
};
