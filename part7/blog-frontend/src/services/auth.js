import axios from 'axios';

const baseUrl = '/api/login';
const localStorageUserKey = 'blogAppUser';

const getLocalUser = () => {
  const localUser = window.localStorage.getItem(localStorageUserKey);
  return localUser ? JSON.parse(localUser) : undefined;
};

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  window.localStorage.setItem(
    localStorageUserKey,
    JSON.stringify(response.data)
  );
  return response.data;
};

const logout = () => {
  window.localStorage.removeItem(localStorageUserKey);
};

export default { login, logout, getLocalUser };
