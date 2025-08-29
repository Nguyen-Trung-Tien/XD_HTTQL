import { configureStore } from "@reduxjs/toolkit";
import userReducer, { loadUserFromStorage } from "./slice/userSlice";

const preloadedState = {
  user: loadUserFromStorage() || {
    id: "",
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    phoneNumber: "",
    role: "",
    image: "",
    status: "",
    gender: "",
    avatarBase64: "",
    access_token: "",
    refresh_token: "",
    currentUser: null,
  },
};
const store = configureStore({
  reducer: {
    user: userReducer,
  },
  preloadedState,
});

export default store;
