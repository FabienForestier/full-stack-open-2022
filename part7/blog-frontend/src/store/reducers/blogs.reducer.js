import { createSlice } from '@reduxjs/toolkit';
import blogsService from '../../services/blogs';

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(_, { payload: blogs }) {
      return blogs;
    },
    addBlog(state, { payload: blog }) {
      return state.concat(blog);
    }
  }
});

const { setBlogs, addBlog } = blogsSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogsService.getAll();
    return dispatch(setBlogs(blogs));
  };
};

export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogsService.create(blog);
    return dispatch(addBlog(newBlog));
  };
};

export default blogsSlice.reducer;
