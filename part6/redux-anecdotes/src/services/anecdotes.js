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

const methods = { getAll, save };
export default methods; 