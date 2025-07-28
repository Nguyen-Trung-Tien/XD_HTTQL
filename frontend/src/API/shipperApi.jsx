
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const getAllShippers = async () => {
  const response = await axios.get(`${API_URL}/api/v1/shipper/get-all`);
  return Array.isArray(response.data) ? response.data : [];
};
export { getAllShippers };