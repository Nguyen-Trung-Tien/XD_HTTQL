import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const SignInUser = async (userEmail, userPassword) => {
  try {
    const response = await axios.post(`${API_URL}/api/v1/user/login-user`, {
      email: userEmail,
      password: userPassword,
    });
    const { user, access_token, refresh_token, errCode, message } =
      response.data;
    return {
      user,
      access_token,
      refresh_token,
      errCode,
      message,
    };
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const SignUpUser = async (data) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/v1/user/create-new-user`,
      data
    );
    return response.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const RefreshToken = async (refresh_token) => {
  try {
    const response = await axios.post(`${API_URL}/api/v1/user/refresh-token`, {
      refresh_token,
    });
    const { access_token, message } = response.data;
    return {
      access_token,
      message,
    };
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export { SignInUser, SignUpUser, RefreshToken };
