import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchAllCustomers = async (
  page = 1,
  limit = 5,
  search = "",
  status = "",
  city = ""
) => {
  return axios.get(`${API_URL}/api/v1/customer/get-all-customers`, {
    params: { page, limit, search, status, city },
  });
};

export const createCustomer = async (data) => {
  return axios.post(`${API_URL}/api/v1/customer/create-customer`, data);
};

export const updateCustomer = async (data) => {
  return axios.put(`${API_URL}/api/v1/customer/update-customer`, data);
};

export const deleteCustomer = async (id) => {
  return await axios.delete(
    `${API_URL}/api/v1/customer/delete-customer?id=${id}`
  );
};
export const deleteManyCustomer = async (ids) => {
  if (!ids || !ids.length) throw new Error("Missing ids"); // optional
  return await axios.post(`${API_URL}/api/v1/customer/delete-many-customers`, {
    ids,
  });
};
