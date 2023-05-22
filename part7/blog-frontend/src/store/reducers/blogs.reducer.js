import { createSlice } from '@reduxjs/toolkit';
import blogsService from '../../services/blogs';

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(_, { payload: blogs }) {
      return blogs;
    }
  }
});

const { setBlogs } = blogsSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogsService.getAll();
    return dispatch(setBlogs(blogs));
  };
};

export default blogsSlice.reducer;
