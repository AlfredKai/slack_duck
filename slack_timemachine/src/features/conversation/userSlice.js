import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsersStatus',
  async () => {
    let data = await fetch('/users');
    let jsonData = await data.json();
    return jsonData.users;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
    status: 'idle',
  },
  reducers: {
    fetchUsers: (state, action) => {
      state.users.concat(action.payload);
      for (let msg of action.payload) {
        state.users.push(msg);
      }
    },
  },
  extraReducers: {
    [fetchUsers.fulfilled]: (state, action) => {
      if (state.status === 'pending') {
        state.users.concat(action.payload);
        for (let msg of action.payload) {
          state.users.push(msg);
        }
        state.status = 'fetched';
      }
    },
    [fetchUsers.pending]: (state) => {
      if (state.status === 'idle') {
        state.status = 'pending';
      }
    },
  },
});

export const selectUsers = (state) => state.user.users;

export default userSlice.reducer;
