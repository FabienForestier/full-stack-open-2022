import { useEffect, useRef, useState } from 'react';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import UserInfo from './components/UserInfo';
import useBlogs from './hooks/blogs';
import { useNotification } from './hooks/notification';
import authService from './services/auth';
import blogService from './services/blogs';

function App() {
  const [notification, notify] = useNotification();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(undefined);
  const { blogs, addBlog, likeBlog, removeBlog } = useBlogs(user);
  const blogFormToggleRef = useRef();
  const blogFormRef = useRef();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const userInfo = await authService.login({ username, password });
      setUser(userInfo);
      setUsername('');
      setPassword('');
    } catch (exception) {
      notify('Wrong credentials', 'error');
    }
  };

  const logout = () => {
    setUser(undefined);
    authService.logout();
    blogService.setToken(undefined);
  };

  const resetBlogForm = () => {
    blogFormRef.current.reset();
  };

  const addNewBlog = async (blog) => {
    try {
      await addBlog(blog);
      blogFormToggleRef.current.toggleVisibility();
      resetBlogForm();
      notify(`A new blog ${blog.title} by ${blog.author} has been added`, 'success');
    } catch (error) {
      notify('Failed to add the blog', 'error');
    }
  };

  const handleLikeBlog = async (likedBlog) => {
    try {
      await likeBlog(likedBlog.id);
    } catch (error) {
      notify('Failed to like the blog', 'error');
    }
  };

  const handleRemoveBlog = async (blogToDelete) => {
    if (
      window.confirm(
        `Are you sure you want to delete ${blogToDelete.title} by ${blogToDelete.author}`
      ) === false
    ) {
      return;
    }
    try {
      await removeBlog(blogToDelete.id);
    } catch (error) {
      notify('Failed to delete the blog', 'error');
    }
  };

  useEffect(() => {
    const localUser = authService.getLocalUser();
    if (localUser) {
      setUser(localUser);
      blogService.setToken(localUser.token);
    }
  }, []);

  if (user) {
    return (
      <div>
        <h2>blogs</h2>
        <UserInfo name={user.name} logout={logout} />
        <Notification notification={notification} />
        <Togglable
          dataCy="create-blog-button"
          label="Create a blog"
          handleCancel={resetBlogForm}
          ref={blogFormToggleRef}>
          <h2>Create a new blog</h2>
          <BlogForm addBlog={addNewBlog} ref={blogFormRef} />
        </Togglable>

        <h2>Your blogs</h2>
        {user.username}
        {blogs.length &&
          blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              showDeleteButton={blog.user.username === user.username}
              handleLikeBlog={handleLikeBlog}
              handleRemoveBlog={handleRemoveBlog}
            />
          ))}
      </div>
    );
  }

  return (
    <div>
      <h2>Log in to the application</h2>
      <Notification notification={notification} />
      <LoginForm
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        handleLogin={handleLogin}
      />
    </div>
  );
}

export default App;
