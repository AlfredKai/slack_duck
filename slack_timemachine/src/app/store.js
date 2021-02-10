import { configureStore } from '@reduxjs/toolkit';
import conversationReducer from '../features/conversation/conversationSlice'
import userReducer from '../features/conversation/userSlice'
import enterReducer from '../features/enter/enterSlice'

export default configureStore({
  reducer: {
    conversation: conversationReducer,
    user: userReducer,
    enter: enterReducer,
  },
});
