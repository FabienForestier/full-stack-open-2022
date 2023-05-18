import axios from 'axios';

const serverUrl = 'http://localhost:3001/anecdotes';

const getAll = () => axios.get(serverUrl).then((response) => response.data);

const methods = { getAll };
export default methods;
