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
  access_token: "",
  refresh_token: "",
  currentUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.currentUser = action.payload;
    },
    logout: (state) => {
      state.currentUser = null;
    },
    updateUser: (state, action) => {
      const {
        id,
        email,
        firstName,
        lastName,
        address,
        phoneNumber,
        role,
        image,
        access_token,
        refresh_token,
      } = action.payload;
      state.id = id;
      state.email = email;
      state.firstName = firstName;
      state.lastName = lastName;
      state.address = address;
      state.phoneNumber = phoneNumber;
      state.role = role;
      state.image = image;
      state.access_token = access_token;
      state.refresh_token = refresh_token;
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
      state.access_token = "";
      state.refresh_token = "";
    },
  },
});

export const { login, logout, updateUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
