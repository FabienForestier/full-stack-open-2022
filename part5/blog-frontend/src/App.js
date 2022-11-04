import { useState } from 'react';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import blogService from './services/blogs';
import loginService from './services/login';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(undefined);
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const userInfo = await loginService.login({ username, password });
      setUser(userInfo);
      setUsername('');
      setPassword('');
      console.log(userInfo);
      blogService.setToken(userInfo.token);
      blogService.getAll().then((blogsFromBackend) => setBlogs(blogsFromBackend));
    } catch (exception) {
      setErrorMessage('Wrong credentials');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  if (user) {
    return (
      <div>
        <h2>blogs</h2>
        <p>
          {`${user.name} logged in`}
        </p>
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
