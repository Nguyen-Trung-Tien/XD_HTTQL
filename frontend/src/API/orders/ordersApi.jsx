import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const getAllOrders = async () => {
  const response = await axios.get(`${API_URL}/api/v1/orders/get-all`);
  return Array.isArray(response.data) ? response.data : [];
};

const createOrder = async (orderData) => {
  const response = await axios.post(`${API_URL}/api/v1/orders/create`, orderData);
  return response.data;
};

const updateOrder = async (orderId, updatedData) => {
  const response = await axios.put(
    `${API_URL}/api/v1/orders/update/${orderId}`,
    updatedData
  );
  return response.data;
};

const deleteOrder = async (orderId) => {
  const response = await axios.delete(`${API_URL}/api/v1/orders/delete/${orderId}`);
  return response.data;
};

export { getAllOrders, createOrder, updateOrder, deleteOrder };