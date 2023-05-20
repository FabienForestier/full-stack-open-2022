import { configureStore } from '@reduxjs/toolkit';
import notificationsReducer from './reducers/notification.reducer';

const store = configureStore({
  reducer: {
    notification: notificationsReducer
  }
});

export default store;
