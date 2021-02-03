import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import conversationReducer from '../features/conversation/conversationSlice'
import userReducer from '../features/conversation/userSlice'

export default configureStore({
  reducer: {
    counter: counterReducer,
    conversation: conversationReducer,
    user: userReducer,
  },
});
