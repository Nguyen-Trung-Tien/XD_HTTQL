import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const SignInUser = async (userEmail, userPassword) => {
  const response = await axios.post(`${API_URL}/api/v1/user/login-user`, {
    email: userEmail,
    password: userPassword,
  });

  return response.data;
};
const SignUpUser = async (data) => {
  const response = await axios.post(
    `${API_URL}/api/v1/user/create-new-user`,
    data
  );
  return response.data;
};
export { SignInUser, SignUpUser };
