import { configureStore } from '@reduxjs/toolkit';
import blogsReducer from './reducers/blogs.reducer';
import notificationsReducer from './reducers/notification.reducer';

const store = configureStore({
  reducer: {
    notification: notificationsReducer,
    blogs: blogsReducer
  }
});

export default store;
