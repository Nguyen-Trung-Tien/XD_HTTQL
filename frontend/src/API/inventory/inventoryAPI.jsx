import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const getAllInventory = async () => {
  const response = await axios.get(`${API_URL}/api/v1/inventory/get-all`);
  return Array.isArray(response.data) ? response.data : [];
};

const createInventory = async (inventoryData) => {
  const response = await axios.post(`${API_URL}/api/v1/inventory/create`, inventoryData);
  return response.data;
};

const updateInventory = async (inventoryId, updatedData) => {
  const response = await axios.put(
    `${API_URL}/api/v1/inventory/update/${inventoryId}`,
    updatedData
  );
  return response.data;
};

const deleteInventory = async (inventoryId, userId) => {
  const response = await axios.delete(
    `${API_URL}/api/v1/inventory/delete/${inventoryId}`,
    { data: { userId } }
  );
  return response.data;
};

const getInventoryLogs = async () => {
  const response = await axios.get(`${API_URL}/api/v1/inventory/logs`);
  return Array.isArray(response.data) ? response.data : [];
};

export {
  getAllInventory,
  createInventory,
  updateInventory,
  deleteInventory,
  getInventoryLogs
};