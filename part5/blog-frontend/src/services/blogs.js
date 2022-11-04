import axios from 'axios';

const baseUrl = '/api/blogs';
let token = null;

const getAuthHeaders = (userToken) => ({
  headers: {
    Authorization: `bearer ${userToken}`,
  },
});

const setToken = (userToken) => {
  token = userToken;
};

const getAll = async () => {
  const response = await axios.get(baseUrl, getAuthHeaders(token));
  return response.data;
};

export default { getAll, setToken };
