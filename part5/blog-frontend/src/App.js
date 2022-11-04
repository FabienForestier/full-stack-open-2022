import { useEffect, useState } from 'react';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import UserInfo from './components/UserInfo';
import authService from './services/auth';
import blogService from './services/blogs';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(undefined);
  const [blogs, setBlogs] = useState([]);
  const [blogTitle, setBlogTitle] = useState('');
  const [blogAuthor, setBlogAuthor] = useState('');
  const [blogUrl, setBlogUrl] = useState('');
  const [notification, setNotification] = useState(null);

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
  };

  const addNewBlog = async (event) => {
    event.preventDefault();
    try {
      const newBlog = await blogService.create(
        { title: blogTitle, author: blogAuthor, url: blogUrl },
      );
      setBlogs(blogs.concat(newBlog));
      setBlogTitle('');
      setBlogAuthor('');
      setBlogUrl('');
      displayMessage(`A new blog ${newBlog.title} by ${newBlog.author} has been added`, 'success');
    } catch (error) {
      displayMessage('Failed to add the blog', 'error');
    }
  };

  const loadBlogs = async () => {
    const blogsFromBackend = await blogService.getAll();
    setBlogs(blogsFromBackend);
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
        <h2>Create a new blog</h2>
        <Notification notification={notification} />
        <BlogForm
          title={blogTitle}
          setTitle={setBlogTitle}
          author={blogAuthor}
          setAuthor={setBlogAuthor}
          url={blogUrl}
          setUrl={setBlogUrl}
          addBlog={addNewBlog}
        />
        <h2>Your blogs</h2>
        {blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
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
