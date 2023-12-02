import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "Valentinote+++",
  user: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value = "Login";
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = [];
      localStorage.clear();
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, incrementByAmount } = userSlice.actions;

export default userSlice.reducer;
