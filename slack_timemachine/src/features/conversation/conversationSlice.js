import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchMessages = createAsyncThunk(
  'users/fetchMessagesStatus',
  async (offset = 0) => {
    let data = await fetch(`/messages?offset=${offset}&limit=500`);
    let jsonData = await data.json();
    return jsonData.messages;
  }
);

export const conversationSlice = createSlice({
  name: 'conversation',
  initialState: {
    messages: [],
    status: 'idle',
    isEnd: false,
    error: null,
  },
  extraReducers: {
    [fetchMessages.fulfilled]: (state, action) => {
      state.messages.concat(action.payload);
      for (let msg of action.payload) {
        state.messages.push(msg);
      }
      if (action.payload.length === 0) {
        state.isEnd = true;
      }
    },
  },
});

export const selectMessages = (state) => state.conversation.messages;

export default conversationSlice.reducer;
