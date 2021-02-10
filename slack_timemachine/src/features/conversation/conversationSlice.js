import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchMessages = createAsyncThunk(
  'users/fetchMessagesStatus',
  async (offset = 0) => {
    let data = await fetch(`/messages?offset=${offset}&limit=100`);
    let jsonData = await data.json();
    return jsonData.messages;
  }
);

export const fetchReplies = createAsyncThunk(
  'users/fetchRepliesStatus',
  async (thread_ts) => {
    let data = await fetch(`/replies?thread_ts=${thread_ts}`);
    let jsonData = await data.json();
    return jsonData.replies;
  }
);

export const fetchChannelInfo = createAsyncThunk(
  'users/fetchChannelInfo',
  async (thread_ts) => {
    let data = await fetch(`/channel_info`);
    let jsonData = await data.json();
    return jsonData.channel;
  }
);

export const conversationSlice = createSlice({
  name: 'conversation',
  initialState: {
    messages: [],
    replies: [],
    channel: {},
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
    [fetchReplies.fulfilled]: (state, action) => {
      state.replies = action.payload;
    },
    [fetchChannelInfo.fulfilled]: (state, action) => {
      state.channel = action.payload;
    },
  },
});

export const selectMessages = (state) => state.conversation.messages;
export const selectReplies = (state) => state.conversation.replies;

export default conversationSlice.reducer;
