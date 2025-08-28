import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  email: "",
  firstName: "",
  lastName: "",
  address: "",
  phoneNumber: "",
  role: "",
  image: "",
  avatarBase64: "",
  access_token: "",
  refresh_token: "",
  currentUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      const user = action.payload;
      state.id = user.id || "";
      state.email = user.email || "";
      state.firstName = user.firstName || "";
      state.lastName = user.lastName || "";
      state.address = user.address || "";
      state.phoneNumber = user.phoneNumber || "";
      state.role = user.role || "";
      state.image = user.image || "";
      state.avatarBase64 = user.avatarBase64 || "";
      state.access_token = user.access_token || "";
      state.refresh_token = user.refresh_token || "";
      state.currentUser = user;
    },
    resetUser: (state) => {
      state.id = "";
      state.email = "";
      state.firstName = "";
      state.lastName = "";
      state.address = "";
      state.phoneNumber = "";
      state.role = "";
      state.image = "";
      state.avatarBase64 = "";
      state.access_token = "";
      state.refresh_token = "";
      state.currentUser = null;
    },
  },
});

export const loadUserFromStorage = () => {
  try {
    const userData = localStorage.getItem("user");
    if (userData) {
      return JSON.parse(userData);
    }
  } catch (e) {
    console.error("Failed to load user from localStorage", e);
  }
  return null;
};
export const { login, resetUser } = userSlice.actions;
export default userSlice.reducer;
