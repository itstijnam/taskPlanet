import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userSubmit: [],
  userPostArray: [],
};

const userPostSlice = createSlice({
  name: 'userSubmit',
  initialState,
  reducers: {
    setUserSubmit(state, action) {
      state.userSubmit = action.payload;
    },
    setUserPostArray(state, action) {
      state.userPostArray = action.payload;
    },
  },
});

export const { setUserSubmit, setUserPostArray } = userPostSlice.actions;

export default userPostSlice.reducer;
