function LoginForm({
  username, password, setUsername, setPassword, handleLogin,
}) {
  return (
    <form onSubmit={handleLogin}>
      <div>
        Username
        <input
          type="text"
          name="username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        Password
        <input
          type="password"
          name="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
