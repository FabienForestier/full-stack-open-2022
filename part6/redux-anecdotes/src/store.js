import { configureStore } from "@reduxjs/toolkit";
import anecdotesReducer from './reducers/anecdoteReducer';
import filterReducer from './reducers/filterReducer';
import notificationsReducer from './reducers/notificationsReducer';

export default configureStore({
  reducer: {
    anecdotes: anecdotesReducer,
    filter: filterReducer,
    notifications: notificationsReducer
  }
})