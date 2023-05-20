import axios from 'axios'

const getAll = (url) => {
  return axios.get(url).then((res) => res.data)
}

const create = (url, body) => {
  return axios.post(url, body)
}

const apiService = { getAll, create };
export default apiService