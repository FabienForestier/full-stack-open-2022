import { createSlice } from '@reduxjs/toolkit';
import blogsService from '../../services/blogs';

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    set(_, { payload: blogs }) {
      return blogs;
    },
    create(state, { payload: blog }) {
      state.push(blog);
    },
    update(state, { payload: updatedBlog }) {
      const index = state.findIndex((blog) => blog.id === updatedBlog.id);
      state.splice(index, 1, updatedBlog);
      state.sort((prev, current) => current.likes - prev.likes);
    },
    remove(state, { payload: blogId }) {
      const index = state.findIndex((blog) => blog.id === blogId);
      state.splice(index, 1);
    }
  }
});

const { set, create, update, remove } = blogsSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogsService.getAll();
    return dispatch(set(blogs));
  };
};

export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogsService.create(blog);
    return dispatch(create(newBlog));
  };
};

export const likeBlog = (blogId) => {
  return async (dispatch) => {
    const updatedBlog = await blogsService.like(blogId);
    return dispatch(update(updatedBlog));
  };
};

export const removeBlog = (blogId) => {
  return async (dispatch) => {
    await blogsService.remove(blogId);
    return dispatch(remove(blogId));
  };
};

export default blogsSlice.reducer;
