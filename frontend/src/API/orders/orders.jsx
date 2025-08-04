import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const getAllOrders = async () => {
  const response = await axios.get(`${API_URL}/orders/get-all`);
  return Array.isArray(response.data) ? response.data : [];
};

const createOrder = async (orderData) => {
  const response = await axios.post(`${API_URL}/orders/create`, orderData);
  return response.data;
};

const updateOrder = async (orderId, updatedData) => {
  const response = await axios.put(
    `${API_URL}/orders/update/${orderId}`,
    updatedData
  );
  return response.data;
};

const deleteOrder = async (orderId) => {
  const response = await axios.delete(`${API_URL}/orders/delete/${orderId}`);
  return response.data;
};

export { getAllOrders, createOrder, updateOrder, deleteOrder };