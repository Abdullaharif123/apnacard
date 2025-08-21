import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  cardNumber: null,
  isLoggedIn: false,
  role: null,
  error: null,
  open: false,
  onClose: false,
  type: null,
  message: null,
  orgId: null,
  userId: null,
  email: null, // ✅ Add if not already
  firstName: null, // ✅ Add this
  lastName: null,
  category: { name: "", id: "", userID: "", cardNo: "" },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.accessToken;
      state.cardNumber = action.payload.cardNumber;
      state.isLoggedIn = true;
      state.orgId = action.payload.orgId;
      state.userId = action.payload.userId;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.error = null;

      state.firstName = action.payload.firstName || null;
      state.lastName = action.payload.lastName || null;
    },
    logout: (state) => {
      state.token = null;
      state.cardNumber = null;
      state.isLoggedIn = false;
      state.role = null;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.error = action.payload;
    },
    notification: (state, action) => {
      state.open = action.payload.open;
      state.onClose = action.payload.onClose;
      state.type = action.payload.type;
      state.message = action.payload.message;
    },
    category: (state, action) => {
      state.category = action.payload.category;
    },
  },
});

export const { loginSuccess, logout, loginFailure, notification, category } =
  authSlice.actions;

export default authSlice.reducer;
