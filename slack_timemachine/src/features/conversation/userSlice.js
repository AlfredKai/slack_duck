import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
  },
  reducers: {
    fetchUsers: (state, action) => {
      state.users.concat(action.payload);
      for (let msg of action.payload) {
        state.users.push(msg);
      }
    },
  },
});

export const { fetchUsers } = userSlice.actions;

export const fetchUsersAsync = () => async (dispatch) => {
  let data = await fetch('/users');
  let jsonData = await data.json();
  dispatch(fetchUsers(jsonData.users));
};

export const selectUsers = (state) => state.user.users;

export default userSlice.reducer;
