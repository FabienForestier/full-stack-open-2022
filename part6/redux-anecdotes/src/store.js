import { configureStore } from "@reduxjs/toolkit";
import anecdotesReducer from './reducers/anecdoteReducer';
import filterReducer from './reducers/filterReducer';

export default configureStore({
  reducer: {
    anecdotes: anecdotesReducer,
    filter: filterReducer
  }
})