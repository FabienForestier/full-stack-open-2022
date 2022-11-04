import { useEffect, useState } from 'react';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import UserInfo from './components/UserInfo';
import authService from './services/auth';
import blogService from './services/blogs';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(undefined);
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  const displayError = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
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
      displayError('Wrong credentials');
    }
  };

  const logout = () => {
    setUser(undefined);
    authService.logout();
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
      blogService.getAll().then((blogsFromBackend) => setBlogs(blogsFromBackend));
    }
  }, [user]);

  if (user) {
    return (
      <div>
        <h2>blogs</h2>
        <UserInfo name={user.name} logout={logout} />
        {blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
      </div>
    );
  }

  return (
    <div>
      <h2>Log in to the application</h2>
      <LoginForm
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        handleLogin={handleLogin}
      />
      {errorMessage}
    </div>
  );
}

export default App;
