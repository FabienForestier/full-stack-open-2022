import { useEffect, useRef, useState } from 'react';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import UserInfo from './components/UserInfo';
import authService from './services/auth';
import blogService from './services/blogs';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(undefined);
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState(null);
  const blogFormToggleRef = useRef();
  const blogFormRef = useRef();

  const displayMessage = (messageToDisplay, type) => {
    setNotification({ message: messageToDisplay, type });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const userInfo = await authService.login({ username, password });
      setUser(userInfo);
      setUsername('');
      setPassword('');
    } catch (exception) {
      displayMessage('Wrong credentials', 'error');
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
      const newBlog = await blogService.create(blog);
      blogFormToggleRef.current.toggleVisibility();
      setBlogs(blogs.concat(newBlog));
      resetBlogForm();
      displayMessage(`A new blog ${newBlog.title} by ${newBlog.author} has been added`, 'success');
    } catch (error) {
      displayMessage('Failed to add the blog', 'error');
    }
  };

  const handleLikeBlog = async (likedBlog) => {
    try {
      await blogService.update(likedBlog);
      setBlogs((prevState) => prevState.map((blog) => {
        if (blog.id === likedBlog.id) {
          return { ...blog, ...likedBlog };
        }
        return blog;
      }).sort((prev, current) => current.likes - prev.likes));
    } catch (error) {
      displayMessage('Failed to like the blog', 'error');
    }
  };

  const handleRemoveBlog = async (blogToDelete) => {
    if (window.confirm(`Are you sure you want to delete ${blogToDelete.title} by ${blogToDelete.author}`) === false) {
      return;
    }
    try {
      await blogService.remove(blogToDelete.id);
      setBlogs((prevState) => prevState.reduce((processedBlogs, blog) => {
        if (blog.id === blogToDelete.id) {
          return processedBlogs;
        }
        return processedBlogs.concat(blog);
      }, []));
    } catch (error) {
      displayMessage('Failed to delete the blog', 'error');
    }
  };

  const loadBlogs = async () => {
    try {
      const blogsFromBackend = await blogService.getAll();
      setBlogs(blogsFromBackend);
    } catch (error) {
      if (error.request.status === 401) {
        logout();
      }
    }
  };

  useEffect(() => {
    const localUser = authService.getLocalUser();
    if (localUser) {
      setUser(localUser);
    }
  }, []);

  useEffect(() => {
    if (user) {
      blogService.setToken(user.token);
      loadBlogs();
    }
  }, [user]);

  if (user) {
    return (
      <div>
        <h2>blogs</h2>
        <UserInfo name={user.name} logout={logout} />
        <Notification notification={notification} />
        <Togglable dataCy="create-blog-button" label="Create a blog" handleCancel={resetBlogForm} ref={blogFormToggleRef}>
          <h2>Create a new blog</h2>
          <BlogForm addBlog={addNewBlog} ref={blogFormRef} />
        </Togglable>

        <h2>Your blogs</h2>
        {user.username}
        {blogs.map((blog) => (
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
