function UserInfo({ name, logout }) {
  return (
    <div>
      {`${name} logged in`}
      <button type="button" onClick={logout}>Logout</button>
    </div>
  );
}

export default UserInfo;
