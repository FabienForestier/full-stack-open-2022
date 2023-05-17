import { configureStore } from "@reduxjs/toolkit";
import anecdotesReducer from './reducers/anecdoteReducer';
import filterReducer from './reducers/filterReducer';
import notificationReducer from "./reducers/notificationReducer";

export default configureStore({
  reducer: {
    anecdotes: anecdotesReducer,
    filter: filterReducer,
    notification: notificationReducer
  }
})