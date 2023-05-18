import axios from 'axios';

const serverUrl = 'http://localhost:3001/anecdotes';

const getAll = () => axios.get(serverUrl).then((response) => response.data);

const create = (anecdote) => axios.post(serverUrl, anecdote).then((response) => response.data);

const vote = async (id) => {
  const anecdoteUrl = `${serverUrl}/${id}`;
  const response = await axios.get(anecdoteUrl);
  const updated = await axios.put(anecdoteUrl, { ...response.data, votes: response.data.votes + 1})
  return updated.data;
}

const methods = { getAll, create, vote };
export default methods;
