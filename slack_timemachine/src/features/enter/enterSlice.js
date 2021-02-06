import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchEnter = createAsyncThunk(
  'enter/fetchEnter',
  async (password) => {
    let data = await fetch('enter', {
      method: 'POST',
      body: JSON.stringify({ password }),
    });
    let jsonData = await data.json();
    return jsonData.ok;
  }
);

export const enterSlice = createSlice({
  name: 'enter',
  initialState: {
    isEntered: null,
  },
  extraReducers: {
    [fetchEnter.fulfilled]: (state, action) => {
      state.isEntered = action.payload;
    },
    [fetchEnter.pending]: (state, action) => {
      state.isEntered = null;
    },
  },
});

export const selectIsEntered = (state) => state.enter.isEntered;

export default enterSlice.reducer;
