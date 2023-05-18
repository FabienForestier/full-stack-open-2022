import axios from 'axios';

const serverUrl = 'http://localhost:3001/anecdotes';

const getAll = () => axios.get(serverUrl).then((response) => response.data);

const create = (anecdote) => axios.post(serverUrl, anecdote);

const methods = { getAll, create };
export default methods;
