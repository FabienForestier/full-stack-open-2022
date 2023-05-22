import authApiService from '../api/auth';

const localStorageUserKey = 'blogAppUser';

const getLocalUser = () => {
  const localUser = window.localStorage.getItem(localStorageUserKey);
  return localUser ? JSON.parse(localUser) : undefined;
};

const login = async (credentials) => {
  const token = await authApiService.login(credentials);
  window.localStorage.setItem(localStorageUserKey, JSON.stringify(token));
  return token;
};

const logout = () => {
  window.localStorage.removeItem(localStorageUserKey);
};

export default { login, logout, getLocalUser };
