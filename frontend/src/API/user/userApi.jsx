import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const SignInUser = async (userEmail, userPassword) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/v1/user/login-user`,
      {
        email: userEmail,
        password: userPassword,
      },
      {
        withCredentials: true,
      }
    );

    const { user, access_token, errCode, message } = response.data;

    const userData = {
      ...user,
      access_token,
    };

    localStorage.setItem("user", JSON.stringify(userData));

    return {
      user,
      access_token,
      errCode,
      message,
    };
  } catch (e) {
    console.error("SignInUser failed:", e);
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

const GetDetailUser = async (userId) => {
  try {
    const response = await axios.get(
      `${API_URL}/api/v1/user/get-all-user?id=${userId}`
    );
    return response.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
const DeleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${API_URL}/api/v1/user/delete-user`, {
      data: { id: userId },
    });
    return response.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const UpdateDetailUser = async (data) => {
  try {
    const response = await axios.put(
      `${API_URL}/api/v1/user/update-user`,
      data
    );
    return response.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const UserLogout = async () => {
  return await axios.post(`${API_URL}/api/v1/user/logout`, null, {
    withCredentials: true,
  });
};

const RefreshToken = async () => {
  try {
    const response = await axios.post(
      `${API_URL}/api/v1/user/refresh-token`,
      {},
      { withCredentials: true }
    );
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

export {
  SignInUser,
  SignUpUser,
  RefreshToken,
  UserLogout,
  GetDetailUser,
  DeleteUser,
  UpdateDetailUser,
};
