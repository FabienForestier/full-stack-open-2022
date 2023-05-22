import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeBlogs } from '../store/reducers/blogs.reducer';

const useBlogs = (user) => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);

  useEffect(() => {
    if (user) {
      dispatch(initializeBlogs());
    }
  }, [user]);

  return blogs;
};

export default useBlogs;
