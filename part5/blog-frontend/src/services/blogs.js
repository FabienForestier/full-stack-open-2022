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

const create = async (blog) => {
  const response = await axios.post(baseUrl, blog, getAuthHeaders(token));
  return response.data;
};

const update = async ({ id, likes }) => {
  const response = await axios.put(`${baseUrl}/${id}`, { likes }, getAuthHeaders(token));
  return response.data;
};

export default {
  getAll, setToken, create, update,
};
