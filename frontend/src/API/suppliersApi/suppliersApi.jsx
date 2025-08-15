import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const getAllSuppliers = async (page = 1, limit = 8, search = "") => {
  try {
    const res = await axios.get(`${API_URL}/api/v1/suppliers/get-all`, {
      params: { page, limit, search },
    });
    return res.data;
  } catch (error) {
    console.error(
      "Failed to fetch suppliers:",
      error.response?.data || error.message
    );
    throw error.response?.data || error;
  }
};

const getSupplierById = async (id) => {
  try {
    const res = await axios.get(`${API_URL}/api/v1/suppliers/get-by/${id}`);
    return res.data;
  } catch (error) {
    console.error(
      `Failed to fetch supplier ${id}:`,
      error.response?.data || error.message
    );
    throw error.response?.data || error;
  }
};

const createSupplier = async (data) => {
  try {
    const res = await axios.post(`${API_URL}/api/v1/suppliers/create`, data);
    return res.data;
  } catch (error) {
    console.error(
      "Failed to create supplier:",
      error.response?.data || error.message
    );
    throw error.response?.data || error;
  }
};

const updateSupplier = async (id, data) => {
  try {
    const res = await axios.put(
      `${API_URL}/api/v1/suppliers/update/${id}`,
      data
    );
    return res.data;
  } catch (error) {
    console.error(
      `Failed to update supplier ${id}:`,
      error.response?.data || error.message
    );
    throw error.response?.data || error;
  }
};

const deleteSupplier = async (id) => {
  try {
    const res = await axios.delete(`${API_URL}/api/v1/suppliers/remove/${id}`);
    return res.data;
  } catch (error) {
    console.error(
      `Failed to delete supplier ${id}:`,
      error.response?.data || error.message
    );
    throw error.response?.data || error;
  }
};

export {
  getAllSuppliers,
  getSupplierById,
  createSupplier,
  updateSupplier,
  deleteSupplier,
};
