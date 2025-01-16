import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  admin: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthAdmin(state, action) {
      state.admin = action.payload;
    },
    logoutUser(state) {
      state.admin = null;
    },
  },
});

export const { setAuthAdmin, logoutUser } = authSlice.actions;

export default authSlice.reducer;
