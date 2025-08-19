import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const getAllInventory = async (page = 1, limit = 10) => {
  const response = await axios.get(`${API_URL}/api/v1/inventory`, {
    params: { page, limit }
  });
  return response.data;
};

const createInventoryLog = async (logData) => {
  const response = await axios.post(
    `${API_URL}/api/v1/inventory/create`,
    logData
  );
  return response.data;
};

const editInventoryLog = async (id, logData) => {
  const response = await axios.put(
    `${API_URL}/api/v1/inventory/edit/${id}`,
    logData
  );
  return response.data;
};

const deleteInventoryLog = async (id) => {
  const response = await axios.delete(
    `${API_URL}/api/v1/inventory/delete/${id}`
  );
  return response.data;
};

export {
  getAllInventory,
  createInventoryLog,
  editInventoryLog,
  deleteInventoryLog
};
