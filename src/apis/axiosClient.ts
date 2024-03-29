import axios from 'axios';
import queryString from 'query-string';
import {err} from 'react-native-svg';
const axiosClient = axios.create({
  paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config: any) => {
  config.header = {
    Authorization: '',
    Accept: 'application/json',
    ...config.headers,
  };
  config.data;
  return config;
});

axiosClient.interceptors.response.use(
  res => {
    if (res.data && res.status === 200) {
      return res.data;
    }
    throw new Error('Error');
  },
  error => {
    console.log(`Error api ${JSON.stringify(JSON.stringify(error))}`);
    throw new Error(error.response);
  },
);

export default axiosClient;
