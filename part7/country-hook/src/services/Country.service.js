import axios from 'axios';
const baseUrl = 'https://restcountries.com/v3.1/name/';

const find = (countryName) => {
  return axios.get(`${baseUrl}${countryName}`).then((res) => {
    return res.data.length ? { found: true, data: res.data[0] } : {found: false}
  })
}

const countryService  = {
  find
}

export default countryService;