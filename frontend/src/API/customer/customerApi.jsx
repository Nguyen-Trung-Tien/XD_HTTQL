import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchAllCustomers = async () => {
  return axios.get(`${API_URL}/api/v1/customer/get-all-customers`);
};

export const createCustomer = async (data) => {
  return axios.post(`${API_URL}/api/v1/customer/create-customer`, data);
};

export const updateCustomer = async (data) => {
  return axios.put(`${API_URL}/api/v1/customer/update-customer`, data);
};

export const deleteCustomer = async (id) => {
  await axios.delete(`${API_URL}/api/v1/customer/delete-customer?id=${id}`);
};
