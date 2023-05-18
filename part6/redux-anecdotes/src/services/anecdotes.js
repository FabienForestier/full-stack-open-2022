import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const save = async (anecdoteContent) => {
  const response = await axios.post(baseUrl, { content: anecdoteContent, votes: 0})
  return response.data
}

const vote = async (id) => {
  const anecdoteUrl = `${baseUrl}/${id}`;
  const response = await axios.get(anecdoteUrl);
  const updated = await axios.put(anecdoteUrl, { ...response.data, votes: response.data.votes + 1})
  return updated.data;
}

const methods = { getAll, save, vote };
export default methods; 