import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL;

const getAllProducts = async () => {
  const response = await axios.get(`${API_URL}/api/v1/products`);
  return Array.isArray(response.data) ? response.data : [];
};
export {
  getAllProducts
};