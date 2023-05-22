import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBlog, initializeBlogs } from '../store/reducers/blogs.reducer';

const useBlogs = (user) => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);

  useEffect(() => {
    if (user) {
      dispatch(initializeBlogs());
    }
  }, [user]);

  const addBlog = async (blog) => {
    return dispatch(createBlog(blog));
  };

  return { blogs, addBlog };
};

export default useBlogs;
