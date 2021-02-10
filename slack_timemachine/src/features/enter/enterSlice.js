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

export const fetchVisitCount = createAsyncThunk(
  'enter/fetchVisitCount',
  async () => {
    let data = await fetch('visit', {
      method: 'GET',
    });
    let jsonData = await data.json();
    return jsonData.visit_count;
  }
);

export const fetchVisit = createAsyncThunk('enter/fetchVisit', async () => {
  fetch('visit', {
    method: 'POST',
  });
});

export const enterSlice = createSlice({
  name: 'enter',
  initialState: {
    isEntered: null,
    visitCount: null,
  },
  extraReducers: {
    [fetchEnter.fulfilled]: (state, action) => {
      state.isEntered = action.payload;
    },
    [fetchEnter.pending]: (state, action) => {
      state.isEntered = null;
    },
    [fetchVisitCount.fulfilled]: (state, action) => {
      state.visitCount = action.payload;
    },
  },
});

export const selectIsEntered = (state) => state.enter.isEntered;

export default enterSlice.reducer;
