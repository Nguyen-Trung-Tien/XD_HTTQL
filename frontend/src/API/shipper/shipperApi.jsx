
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const getAllShippers = async () => {
  const response = await axios.get(`${API_URL}/api/v1/shipper/get-all`);
  return Array.isArray(response.data) ? response.data : [];
};
const addNewShipper = async (shipperData) => {
  const response = await axios.post(
    `${API_URL}/api/v1/shipper/create-new-shipper`,
    shipperData
  );
  return response.data;
};
const deleteShipper = async (shipperId) => {
  const response = await axios.delete(`${API_URL}/api/v1/shipper/delete-shipper/${shipperId}`);
  return response.data;
};
export { getAllShippers, addNewShipper, deleteShipper };