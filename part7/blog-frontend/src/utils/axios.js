import axios from 'axios';

const instance = axios.create();

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.request.status === 401) {
      // TODO: logout
      console.log('Intercepted 401');
    }
    return Promise.reject(error);
  }
);

export default instance;
