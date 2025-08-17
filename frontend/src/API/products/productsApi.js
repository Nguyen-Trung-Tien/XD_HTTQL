import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL;

const getAllProducts = async (page = 1, limit = 10) => {
  const response = await axios.get(`${API_URL}/api/v1/products`, {
    params: {
      page,
      limit
    }
  });
  return response.data;
};

const createProduct = async (productData) => {
  const response = await axios.post(`${API_URL}/api/v1/products/create`, productData);
  return response.data;
};

const editProduct = async (id, productData) => {
  const response = await axios.put(`${API_URL}/api/v1/products/edit/${id}`, productData);
  return response.data;
};

const deleteProduct = async (id) => {
  const response = await axios.delete(`${API_URL}/api/v1/products/delete/${id}`);
  return response.data;
};

export {
  getAllProducts,
  createProduct,
  editProduct,
  deleteProduct
};