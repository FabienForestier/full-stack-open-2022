import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBlog, initializeBlogs, likeBlog, removeBlog } from '../store/reducers/blogs.reducer';

const useBlogs = (user) => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);

  useEffect(() => {
    if (user) {
      dispatch(initializeBlogs());
    }
  }, [user]);

  return {
    blogs,
    addBlog: async (blog) => {
      return dispatch(createBlog(blog));
    },
    likeBlog: async (blogId) => {
      console.log(blogId);
      return dispatch(likeBlog(blogId));
    },
    removeBlog: async (blogId) => {
      return dispatch(removeBlog(blogId));
    }
  };
};

export default useBlogs;
