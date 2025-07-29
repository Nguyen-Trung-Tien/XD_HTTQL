import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const SignUser = async (userEmail, userPassword) => {
  const response = await axios.post(`${API_URL}/api/v1/user/login-user`, {
    email: userEmail,
    password: userPassword,
  });

  return response.data;
};
export { SignUser };
