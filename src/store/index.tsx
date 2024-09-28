import { configureStore } from '@reduxjs/toolkit';
import { chatReducer } from './reducers/chatReducer';
import { postReducer } from './reducers/postReducer';
import { userReducer } from './reducers/userReducer';
import { activityReducer } from './reducers/activityReducer';

const rootReducer = {
  postModule: postReducer,
  userModule: userReducer,
  chatModule: chatReducer,
  activityModule: activityReducer,
};

export const store = configureStore({
  reducer: rootReducer,
  // Redux Toolkit automatically includes redux-thunk by default
});

// Optional: Export RootState and AppDispatch types for use in components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
